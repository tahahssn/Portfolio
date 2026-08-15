import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import heroImage from "../../../public/images/PNGs/herobg.png";

const FACE_MODEL =
  "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite";

const Backdrop = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let destroyed = false;
    let animationFrame = 0;

    // =========================================================
    // RENDERER
    // =========================================================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.setClearColor(0x000000, 1);

    container.appendChild(
      renderer.domElement
    );

    // =========================================================
    // SCENE / CAMERA
    // =========================================================

    const scene = new THREE.Scene();

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      );

    // =========================================================
    // MOUSE
    // =========================================================

    const targetMouse =
      new THREE.Vector2(0.5, 0.5);

    const mouse =
      new THREE.Vector2(0.5, 0.5);

    const targetVelocity =
      new THREE.Vector2(0, 0);

    const velocity =
      new THREE.Vector2(0, 0);

    let previousMouseX = 0.5;
    let previousMouseY = 0.5;

    const handlePointerMove = (event) => {
      const rect =
        container.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        1 -
        (event.clientY - rect.top) /
        rect.height;

      targetMouse.set(x, y);

      targetVelocity.set(
        x - previousMouseX,
        y - previousMouseY
      );

      previousMouseX = x;
      previousMouseY = y;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    // =========================================================
    // TEXTURE
    // =========================================================

    const textureLoader =
      new THREE.TextureLoader();

    const texture =
      textureLoader.load(heroImage);

    texture.colorSpace =
      THREE.SRGBColorSpace;

    texture.minFilter =
      THREE.LinearFilter;

    texture.magFilter =
      THREE.LinearFilter;

    texture.wrapS =
      THREE.ClampToEdgeWrapping;

    texture.wrapT =
      THREE.ClampToEdgeWrapping;

    // =========================================================
    // FACE DETECTION DEFAULTS
    //
    // These are ONLY fallback values.
    // If detection succeeds, they are replaced automatically.
    //
    // Coordinates are image UV:
    // x = 0 left → 1 right
    // y = 0 bottom → 1 top
    // =========================================================

    const faceCenter =
      new THREE.Vector2(
        0.5,
        0.68
      );

    const faceSize =
      new THREE.Vector2(
        0.18,
        0.22
      );

    const bodyCenter =
      new THREE.Vector2(
        0.5,
        0.42
      );

    const bodySize =
      new THREE.Vector2(
        0.42,
        0.52
      );

    // =========================================================
    // SHADER
    // =========================================================

    const material =
      new THREE.ShaderMaterial({
        uniforms: {

          uTexture: {
            value: texture,
          },

          uTime: {
            value: 0,
          },

          uMouse: {
            value:
              new THREE.Vector2(
                0.5,
                0.5
              ),
          },

          uVelocity: {
            value:
              new THREE.Vector2(
                0,
                0
              ),
          },

          uResolution: {
            value:
              new THREE.Vector2(
                container.clientWidth,
                container.clientHeight
              ),
          },

          uImageResolution: {
            value:
              new THREE.Vector2(
                1672,
                941
              ),
          },

          uFaceCenter: {
            value: faceCenter,
          },

          uFaceSize: {
            value: faceSize,
          },

          uBodyCenter: {
            value: bodyCenter,
          },

          uBodySize: {
            value: bodySize,
          },
        },

        vertexShader: `
          varying vec2 vUv;

          void main() {

            vUv = uv;

            gl_Position =
              vec4(
                position,
                1.0
              );
          }
        `,

        fragmentShader: `
          precision highp float;

          uniform sampler2D uTexture;

          uniform float uTime;

          uniform vec2 uMouse;
          uniform vec2 uVelocity;

          uniform vec2 uResolution;
          uniform vec2 uImageResolution;

          uniform vec2 uFaceCenter;
          uniform vec2 uFaceSize;

          uniform vec2 uBodyCenter;
          uniform vec2 uBodySize;

          varying vec2 vUv;


          // ===================================================
          // NOISE
          // ===================================================

          float hash(vec2 p) {

            return fract(
              sin(
                dot(
                  p,
                  vec2(
                    127.1,
                    311.7
                  )
                )
              ) *
              43758.5453123
            );
          }


          float noise(vec2 p) {

            vec2 i =
              floor(p);

            vec2 f =
              fract(p);

            f =
              f *
              f *
              (
                3.0 -
                2.0 *
                f
              );

            float a =
              hash(i);

            float b =
              hash(
                i +
                vec2(
                  1.0,
                  0.0
                )
              );

            float c =
              hash(
                i +
                vec2(
                  0.0,
                  1.0
                )
              );

            float d =
              hash(
                i +
                vec2(
                  1.0,
                  1.0
                )
              );

            return mix(
              mix(
                a,
                b,
                f.x
              ),
              mix(
                c,
                d,
                f.x
              ),
              f.y
            );
          }


          // ===================================================
          // COVER
          // ===================================================

          vec2 coverUV(
            vec2 uv,
            vec2 viewport,
            vec2 image
          ) {

            float viewportRatio =
              viewport.x /
              viewport.y;

            float imageRatio =
              image.x /
              image.y;

            vec2 scale;

            if (
              viewportRatio >
              imageRatio
            ) {

              scale =
                vec2(
                  1.0,
                  imageRatio /
                  viewportRatio
                );

            } else {

              scale =
                vec2(
                  viewportRatio /
                  imageRatio,
                  1.0
                );
            }

            return
              (
                uv -
                0.5
              ) *
              scale +
              0.5;
          }


          // ===================================================
          // ELLIPSE MASK
          // ===================================================

          float ellipseMask(
            vec2 uv,
            vec2 center,
            vec2 size
          ) {

            vec2 p =
              (uv - center) /
              size;

            float d =
              dot(
                p,
                p
              );

            return
              1.0 -
              smoothstep(
                0.55,
                1.0,
                d
              );
          }


          // ===================================================
          // MAIN
          // ===================================================

          void main() {

            // -----------------------------------------------
            // ALWAYS CENTER THE IMAGE
            // -----------------------------------------------

            vec2 uv =
              coverUV(
                vUv,
                uResolution,
                uImageResolution
              );


            // -----------------------------------------------
            // FACE MASK
            // -----------------------------------------------

            float faceMask =
              ellipseMask(
                uv,
                uFaceCenter,
                uFaceSize
              );


            // -----------------------------------------------
            // UPPER BODY MASK
            // -----------------------------------------------

            float bodyMask =
              ellipseMask(
                uv,
                uBodyCenter,
                uBodySize
              );


            // -----------------------------------------------
            // COMBINED SUBJECT REGION
            // -----------------------------------------------

            float subjectMask =
              max(
                faceMask,
                bodyMask * 0.82
              );


            // -----------------------------------------------
            // MOUSE INFLUENCE
            // -----------------------------------------------

            float mouseDistance =
              distance(
                vUv,
                uMouse
              );

            float mouseInfluence =
              1.0 -
              smoothstep(
                0.0,
                0.72,
                mouseDistance
              );


            // -----------------------------------------------
            // VELOCITY
            // -----------------------------------------------

            float speed =
              length(
                uVelocity
              );

            float motion =
              smoothstep(
                0.0005,
                0.025,
                speed
              );


            // -----------------------------------------------
            // ALWAYS-ACTIVE GLITCH
            //
            // This is the key:
            // the face/body are NEVER perfectly clean.
            // -----------------------------------------------

            float row =
              floor(
                uv.y *
                150.0
              );

            float randomRow =
              hash(
                vec2(
                  row,
                  floor(
                    uTime *
                    5.0
                  )
                )
              );


            float activeStrip =
              step(
                0.58,
                randomRow
              );


            float glitchActivity =
              mix(
                0.45,
                1.0,
                activeStrip
              );


            // -----------------------------------------------
            // ORGANIC MOTION
            // -----------------------------------------------

            float n =
              noise(
                uv *
                5.0 +
                vec2(
                  uTime * 0.025,
                  -uTime * 0.018
                )
              );


            float n2 =
              noise(
                uv *
                18.0 -
                vec2(
                  uTime * 0.04,
                  uTime * 0.025
                )
              );


            // -----------------------------------------------
            // HORIZONTAL DISPLACEMENT
            // -----------------------------------------------

            float horizontal =
              (
                n -
                0.5
              ) *
              0.012;


            horizontal +=
              (
                n2 -
                0.5
              ) *
              subjectMask *
              glitchActivity *
              0.028;


            // -----------------------------------------------
            // MOUSE-DRIVEN DISTORTION
            // -----------------------------------------------

            horizontal +=
              uVelocity.x *
              mouseInfluence *
              subjectMask *
              0.48;


            horizontal +=
              uVelocity.x *
              motion *
              subjectMask *
              0.22;


            // -----------------------------------------------
            // VERTICAL MICRO GLITCH
            // -----------------------------------------------

            float vertical =
              (
                noise(
                  vec2(
                    uv.x *
                    70.0,
                    uTime *
                    7.0
                  )
                ) -
                0.5
              ) *
              subjectMask *
              0.012;


            // -----------------------------------------------
            // APPLY DISPLACEMENT
            // -----------------------------------------------

            vec2 distortedUV =
              uv;

            distortedUV.x +=
              horizontal *
              subjectMask;

            distortedUV.y +=
              vertical;


            // -----------------------------------------------
            // GLITCH SHARDS
            //
            // Slightly different samples create the broken /
            // horizontally torn portrait feeling.
            // -----------------------------------------------

            float shard =
              sin(
                floor(
                  uv.y *
                  85.0
                ) *
                12.9898 +
                uTime *
                7.0
              );


            float shardOffset =
              (
                fract(
                  shard *
                  43758.5453
                ) -
                0.5
              ) *
              subjectMask *
              glitchActivity *
              0.035;


            vec2 shardUV =
              distortedUV;

            shardUV.x +=
              shardOffset;


            // -----------------------------------------------
            // RGB CHANNEL SEPARATION
            // -----------------------------------------------

            float rgb =
              (
                0.002 +
                motion *
                0.008
              ) *
              subjectMask;


            float red =
              texture2D(
                uTexture,
                shardUV +
                vec2(
                  rgb,
                  0.0
                )
              ).r;


            float green =
              texture2D(
                uTexture,
                shardUV
              ).g;


            float blue =
              texture2D(
                uTexture,
                shardUV -
                vec2(
                  rgb,
                  0.0
                )
              ).b;


            vec3 glitchColor =
              vec3(
                red,
                green,
                blue
              );


            // -----------------------------------------------
            // CLEAN IMAGE SAMPLE
            // -----------------------------------------------

            vec3 cleanColor =
              texture2D(
                uTexture,
                uv
              ).rgb;


            // -----------------------------------------------
            // FACE MUST STAY DISTORTED
            //
            // Much stronger blend on the face than body.
            // -----------------------------------------------

            float faceGlitch =
              clamp(
                faceMask *
                (
                  0.82 +
                  motion *
                  0.18
                ),
                0.0,
                1.0
              );


            float bodyGlitch =
              clamp(
                bodyMask *
                0.62,
                0.0,
                1.0
              );


            float finalGlitch =
              max(
                faceGlitch,
                bodyGlitch
              );


            vec3 color =
              mix(
                cleanColor,
                glitchColor,
                finalGlitch
              );


            // -----------------------------------------------
            // MAKE FACE MORE FRAGMENTED
            // -----------------------------------------------

            float fragmentNoise =
              noise(
                uv *
                45.0 +
                uTime *
                2.0
              );


            float fragmentation =
              smoothstep(
                0.35,
                0.72,
                fragmentNoise
              ) *
              faceMask;


            color =
              mix(
                color,
                glitchColor,
                fragmentation *
                0.42
              );


            // -----------------------------------------------
            // LIFT IMAGE
            // -----------------------------------------------

            color =
              pow(
                color,
                vec3(
                  0.88
                )
              );

            color *=
              1.12;


            // -----------------------------------------------
            // BLUE ATMOSPHERE
            // -----------------------------------------------

            color +=
              vec3(
                0.008,
                0.015,
                0.035
              );


            // -----------------------------------------------
            // VERY LIGHT VIGNETTE
            // -----------------------------------------------

            float vignette =
              1.0 -
              smoothstep(
                0.58,
                0.92,
                length(
                  vUv -
                  0.5
                )
              );


            color *=
              mix(
                0.97,
                1.0,
                vignette
              );


            gl_FragColor =
              vec4(
                color,
                1.0
              );
          }
        `,
      });

    // =========================================================
    // FULLSCREEN PLANE
    // =========================================================

    const geometry =
      new THREE.PlaneGeometry(
        2,
        2
      );

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    scene.add(mesh);

    // =========================================================
    // RESIZE
    // =========================================================

    const resize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      renderer.setSize(
        width,
        height
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );

      material.uniforms
        .uResolution
        .value
        .set(
          width,
          height
        );
    };

    window.addEventListener(
      "resize",
      resize
    );

    resize();

    // =========================================================
    // FACE DETECTION
    // =========================================================

    const detectFace = async () => {
      try {
        const image =
          new Image();

        image.src =
          heroImage;

        await new Promise(
          (resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
          }
        );

        if (destroyed) {
          return;
        }

        const vision =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
          );

        const detector =
          await FaceDetector.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  FACE_MODEL,
              },

              runningMode:
                "IMAGE",

              minDetectionConfidence:
                0.35,

              minSuppressionThreshold:
                0.3,
            }
          );

        const result =
          detector.detect(
            image
          );

        if (
          !result ||
          !result.detections ||
          !result.detections.length
        ) {
          detector.close();
          return;
        }

        /*
         * Pick the largest / strongest face.
         */

        const detection =
          [...result.detections]
            .sort(
              (a, b) =>
                (
                  b.categories?.[0]?.score ?? 0
                ) -
                (
                  a.categories?.[0]?.score ?? 0
                )
            )[0];

        const box =
          detection.boundingBox;

        if (!box) {
          detector.close();
          return;
        }

        /*
         * MediaPipe bounding boxes use image coordinates:
         * left/top are from the top-left of the source image.
         *
         * Convert to our UV:
         * x: left -> right
         * y: bottom -> top
         */

        const centerX =
          (
            box.originX +
            box.width * 0.5
          ) /
          image.naturalWidth;

        const centerY =
          1.0 -
          (
            box.originY +
            box.height * 0.5
          ) /
          image.naturalHeight;

        const width =
          box.width /
          image.naturalWidth;

        const height =
          box.height /
          image.naturalHeight;

        /*
         * FACE
         *
         * Expand it slightly so the clean face is never
         * sitting outside the glitch field.
         */

        faceCenter.set(
          centerX,
          centerY
        );

        faceSize.set(
          Math.max(
            width * 1.45,
            0.12
          ),
          Math.max(
            height * 1.55,
            0.16
          )
        );

        /*
         * UPPER BODY
         *
         * Derived from the face position.
         *
         * Move downward because body is below face.
         */

        bodyCenter.set(
          centerX,
          centerY -
            Math.max(
              height * 1.55,
              0.20
            )
        );

        bodySize.set(
          Math.max(
            width * 3.4,
            0.34
          ),
          Math.max(
            height * 4.2,
            0.46
          )
        );

        /*
         * Smoothly update shader uniforms.
         */

        material.uniforms
          .uFaceCenter
          .value
          .copy(
            faceCenter
          );

        material.uniforms
          .uFaceSize
          .value
          .copy(
            faceSize
          );

        material.uniforms
          .uBodyCenter
          .value
          .copy(
            bodyCenter
          );

        material.uniforms
          .uBodySize
          .value
          .copy(
            bodySize
          );

        detector.close();

      } catch (error) {
        console.warn(
          "Hero face detection failed. Using fallback region.",
          error
        );
      }
    };

    detectFace();

    // =========================================================
    // ANIMATION
    // =========================================================

    const clock =
      new THREE.Clock();

    const animate = () => {

      if (destroyed) {
        return;
      }

      animationFrame =
        requestAnimationFrame(
          animate
        );

      material.uniforms
        .uTime
        .value =
        clock.getElapsedTime();

      // Smooth mouse
      mouse.lerp(
        targetMouse,
        0.055
      );

      material.uniforms
        .uMouse
        .value
        .copy(
          mouse
        );

      // Smooth velocity
      velocity.lerp(
        targetVelocity,
        0.10
      );

      material.uniforms
        .uVelocity
        .value
        .copy(
          velocity
        );

      // Decay
      targetVelocity.multiplyScalar(
        0.82
      );

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      destroyed = true;

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

      geometry.dispose();
      material.dispose();
      texture.dispose();

      renderer.dispose();

      if (
        renderer.domElement &&
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full overflow-hidden"
    />
  );
};

export default Backdrop;