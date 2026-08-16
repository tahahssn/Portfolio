import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import heroImage from "../../../public/images/PNGs/herobg1.png";

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

    renderer.setClearColor(0x02030a, 1);

    container.appendChild(renderer.domElement);

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

    let previousX = 0.5;
    let previousY = 0.5;

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
        x - previousX,
        y - previousY
      );

      previousX = x;
      previousY = y;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    // =========================================================
    // IMAGE
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
    // AUTO-DETECTED FACE
    // =========================================================

    const faceCenter =
      new THREE.Vector2(0.5, 0.68);

    const faceSize =
      new THREE.Vector2(0.16, 0.20);

    const bodyCenter =
      new THREE.Vector2(0.5, 0.43);

    const bodySize =
      new THREE.Vector2(0.38, 0.48);

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

          /*
           * Main image scale.
           *
           * 1.0 = natural fit
           * 0.82 = slightly smaller
           */
          uImageScale: {
            value: 0.82,
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
          uniform float uImageScale;

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
          // HASH
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
              ) * 43758.5453123
            );
          }


          // ===================================================
          // NOISE
          // ===================================================

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);

            f = f * f * (3.0 - 2.0 * f);

            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));

            return mix(
              mix(a, b, f.x),
              mix(c, d, f.x),
              f.y
            );
          }


          // ===================================================
          // IMAGE FIT
          //
          // IMPORTANT:
          // This does NOT use cover.
          //
          // It keeps the whole image visible and scales it
          // down while preserving its aspect ratio.
          // ===================================================

          vec2 fitImage(
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
                  imageRatio /
                  viewportRatio,
                  1.0
                );

            } else {

              scale =
                vec2(
                  1.0,
                  viewportRatio /
                  imageRatio
                );
            }

            /*
             * Apply additional global scale.
             *
             * This is what prevents the portrait from
             * becoming enormous and cutting the head.
             */

            scale *=
              uImageScale;

            vec2 centered =
              uv - 0.5;

            vec2 imageUv =
              centered /
              scale +
              0.5;

            return imageUv;
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
                0.45,
                1.0,
                d
              );
          }


          // ===================================================
          // MAIN
          // ===================================================

          void main() {

            // -------------------------------------------------
            // FULL IMAGE
            // -------------------------------------------------

            vec2 uv =
              fitImage(
                vUv,
                uResolution,
                uImageResolution
              );


            // -------------------------------------------------
            // Outside image → clamp
            //
            // This avoids stretching/cropping artifacts.
            // -------------------------------------------------

            vec2 sampleUv =
              clamp(
                uv,
                0.001,
                0.999
              );


            // -------------------------------------------------
            // FACE
            // -------------------------------------------------

            float faceMask =
              ellipseMask(
                sampleUv,
                uFaceCenter,
                uFaceSize
              );


            // -------------------------------------------------
            // UPPER BODY
            // -------------------------------------------------

            float bodyMask =
              ellipseMask(
                sampleUv,
                uBodyCenter,
                uBodySize
              );


            // -------------------------------------------------
            // SUBJECT
            // -------------------------------------------------

            float subjectMask =
              max(
                faceMask,
                bodyMask * 0.86
              );


            // -------------------------------------------------
            // MOUSE
            // -------------------------------------------------

            float mouseDistance =
              distance(
                vUv,
                uMouse
              );

            float mouseInfluence =
              1.0 -
              smoothstep(
                0.0,
                0.70,
                mouseDistance
              );


            // -------------------------------------------------
            // VELOCITY
            // -------------------------------------------------

            float speed =
              length(
                uVelocity
              );

            float motion =
              smoothstep(
                0.0004,
                0.025,
                speed
              );


            // -------------------------------------------------
            // CONTINUOUS GLITCH
            // -------------------------------------------------

            float row =
              floor(
                sampleUv.y *
                150.0
              );

            float rowRandom =
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
                0.56,
                rowRandom
              );


            // -------------------------------------------------
            // PROCEDURAL MOVEMENT
            // -------------------------------------------------

            float n1 =
              noise(
                sampleUv * 4.0 +
                vec2(
                  uTime * 0.025,
                  -uTime * 0.016
                )
              );

            float n2 =
              noise(
                sampleUv * 15.0 -
                vec2(
                  uTime * 0.04,
                  uTime * 0.03
                )
              );


            // -------------------------------------------------
            // HORIZONTAL GLITCH
            // -------------------------------------------------

            float horizontal =
              (
                n1 -
                0.5
              ) *
              0.006;


            horizontal +=
              (
                n2 -
                0.5
              ) *
              subjectMask *
              activeStrip *
              0.036;


            // -------------------------------------------------
            // MOUSE IMPULSE
            // -------------------------------------------------

            horizontal +=
              uVelocity.x *
              mouseInfluence *
              subjectMask *
              0.42;


            horizontal +=
              uVelocity.x *
              motion *
              subjectMask *
              0.18;


            // -------------------------------------------------
            // SMALL VERTICAL SHIFT
            // -------------------------------------------------

            float vertical =
              (
                noise(
                  vec2(
                    sampleUv.x * 80.0,
                    uTime * 6.0
                  )
                ) -
                0.5
              ) *
              subjectMask *
              0.008;


            // -------------------------------------------------
            // FINAL DISTORTION
            // -------------------------------------------------

            vec2 distorted =
              sampleUv;

            distorted.x +=
              horizontal *
              subjectMask;

            distorted.y +=
              vertical;


            distorted =
              clamp(
                distorted,
                0.001,
                0.999
              );


            // -------------------------------------------------
            // RGB SPLIT
            // -------------------------------------------------

            float rgbShift =
              (
                0.002 +
                motion * 0.008
              ) *
              subjectMask;


            float red =
              texture2D(
                uTexture,
                distorted +
                vec2(
                  rgbShift,
                  0.0
                )
              ).r;

            float green =
              texture2D(
                uTexture,
                distorted
              ).g;

            float blue =
              texture2D(
                uTexture,
                distorted -
                vec2(
                  rgbShift,
                  0.0
                )
              ).b;


            vec3 glitchColor =
              vec3(
                red,
                green,
                blue
              );


            // -------------------------------------------------
            // CLEAN IMAGE
            // -------------------------------------------------

            vec3 cleanColor =
              texture2D(
                uTexture,
                sampleUv
              ).rgb;


            // -------------------------------------------------
            // STRONG FACE GLITCH
            // -------------------------------------------------

            float faceGlitch =
              clamp(
                faceMask *
                (
                  0.82 +
                  motion * 0.18
                ),
                0.0,
                1.0
              );


            // -------------------------------------------------
            // BODY GLITCH
            // -------------------------------------------------

            float bodyGlitch =
              clamp(
                bodyMask *
                0.58,
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


            // -------------------------------------------------
            // FRAGMENTATION
            // -------------------------------------------------

            float fragmentNoise =
              noise(
                sampleUv * 46.0 +
                uTime * 2.0
              );

            float fragmentation =
              smoothstep(
                0.34,
                0.74,
                fragmentNoise
              ) *
              faceMask;


            color =
              mix(
                color,
                glitchColor,
                fragmentation * 0.46
              );


            // -------------------------------------------------
            // BRIGHTNESS
            // -------------------------------------------------

            color =
              pow(
                color,
                vec3(
                  0.88
                )
              );

            color *=
              1.12;


            // -------------------------------------------------
            // SUBTLE BLUE ATMOSPHERE
            // -------------------------------------------------

            color +=
              vec3(
                0.008,
                0.014,
                0.032
              );


            // -------------------------------------------------
            // MINIMAL VIGNETTE
            // -------------------------------------------------

            float vignette =
              1.0 -
              smoothstep(
                0.60,
                0.94,
                length(
                  vUv - 0.5
                )
              );

            color *=
              mix(
                0.98,
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

        if (destroyed) return;

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
                0.30,

              minSuppressionThreshold:
                0.30,
            }
          );

        const result =
          detector.detect(
            image
          );

        if (
          !result?.detections?.length
        ) {
          detector.close();
          return;
        }

        const detection =
          result.detections[0];

        const box =
          detection.boundingBox;

        if (!box) {
          detector.close();
          return;
        }

        const imageWidth =
          image.naturalWidth;

        const imageHeight =
          image.naturalHeight;

        // Image coordinates → UV
        const centerX =
          (
            box.originX +
            box.width * 0.5
          ) /
          imageWidth;

        const centerY =
          1.0 -
          (
            box.originY +
            box.height * 0.5
          ) /
          imageHeight;

        const width =
          box.width /
          imageWidth;

        const height =
          box.height /
          imageHeight;

        // Face region
        faceCenter.set(
          centerX,
          centerY
        );

        faceSize.set(
          Math.max(
            width * 2.05,
            0.16
          ),
          Math.max(
            height * 2.35,
            0.24
          )
        );

        // Upper body derived from face
        bodyCenter.set(
          centerX,
          centerY -
            Math.max(
              height * 1.65,
              0.20
            )
        );

        bodySize.set(
          Math.max(
            width * 3.6,
            0.36
          ),
          Math.max(
            height * 4.5,
            0.48
          )
        );

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
          "Hero face detection failed. Falling back to default region.",
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
      if (destroyed) return;

      animationFrame =
        requestAnimationFrame(
          animate
        );

      material.uniforms
        .uTime
        .value =
        clock.getElapsedTime();

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