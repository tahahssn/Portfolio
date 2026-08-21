import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

const heroImage = "/images/PNGs/herobg1.png";

const FACE_MODEL =
  "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite";

const WASM_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

const Backdrop = () => {
  const containerRef = useRef(null);

  /*
   * ----------------------------------------------------------
   * Persistent resource refs
   * ----------------------------------------------------------
   */

  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const geometryRef = useRef(null);
  const textureRef = useRef(null);
  const detectorRef = useRef(null);

  const animationFrameRef = useRef(0);
  const destroyedRef = useRef(false);
  const initializedRef = useRef(false);
  const detectingRef = useRef(false);

  /*
   * Face data
   */

  const faceCenterRef = useRef(
    new THREE.Vector2(0.5, 0.68)
  );

  const faceSizeRef = useRef(
    new THREE.Vector2(0.16, 0.20)
  );

  const bodyCenterRef = useRef(
    new THREE.Vector2(0.5, 0.43)
  );

  const bodySizeRef = useRef(
    new THREE.Vector2(0.38, 0.48)
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container || initializedRef.current) {
      return;
    }

    initializedRef.current = true;
    destroyedRef.current = false;

    let renderer;
    let scene;
    let camera;
    let material;
    let geometry;
    let mesh;
    let texture;

    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);

    const velocity = new THREE.Vector2(0, 0);
    const targetVelocity = new THREE.Vector2(0, 0);

    let previousX = 0.5;
    let previousY = 0.5;

    /*
     * ==========================================================
     * RENDERER
     * ==========================================================
     */

    renderer = new THREE.WebGLRenderer({
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

    rendererRef.current = renderer;

    container.appendChild(
      renderer.domElement
    );

    /*
     * ==========================================================
     * WEBGL CONTEXT PROTECTION
     * ==========================================================
     */

    const canvas = renderer.domElement;

    const handleContextLost = (event) => {
      event.preventDefault();

      console.warn(
        "Hero WebGL context lost. Waiting for browser restoration..."
      );
    };

    const handleContextRestored = () => {
      if (destroyedRef.current) {
        return;
      }

      console.info(
        "Hero WebGL context restored."
      );

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
      );

      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );

      if (
        texture &&
        material
      ) {
        texture.needsUpdate = true;
        material.needsUpdate = true;
      }
    };

    canvas.addEventListener(
      "webglcontextlost",
      handleContextLost,
      false
    );

    canvas.addEventListener(
      "webglcontextrestored",
      handleContextRestored,
      false
    );

    /*
     * ==========================================================
     * SCENE / CAMERA
     * ==========================================================
     */

    scene = new THREE.Scene();

    camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      );

    sceneRef.current = scene;
    cameraRef.current = camera;

    /*
     * ==========================================================
     * MOUSE
     * ==========================================================
     */

    const handlePointerMove = (event) => {
      if (destroyedRef.current) {
        return;
      }

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

    /*
     * ==========================================================
     * TEXTURE
     * ==========================================================
     */

    const textureLoader =
      new THREE.TextureLoader();

    texture =
      textureLoader.load(
        heroImage
      );

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

    textureRef.current = texture;

    /*
     * ==========================================================
     * SHADER
     *
     * Keep your existing shader behavior.
     * ==========================================================
     */

    const faceCenter =
      faceCenterRef.current;

    const faceSize =
      faceSizeRef.current;

    const bodyCenter =
      bodyCenterRef.current;

    const bodySize =
      bodySizeRef.current;

    material =
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

          uImageScale: {
            value: 0.82,
          },

          uFaceCenter: {
            value:
              faceCenter,
          },

          uFaceSize: {
            value:
              faceSize,
          },

          uBodyCenter: {
            value:
              bodyCenter,
          },

          uBodySize: {
            value:
              bodySize,
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


          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);

            f =
              f *
              f *
              (
                3.0 -
                2.0 *
                f
              );

            float a = hash(i);
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

            scale *=
              uImageScale;

            vec2 centered =
              uv -
              0.5;

            vec2 imageUv =
              centered /
              scale +
              0.5;

            return imageUv;
          }


          float ellipseMask(
            vec2 uv,
            vec2 center,
            vec2 size
          ) {
            vec2 p =
              (
                uv -
                center
              ) /
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


          void main() {

            vec2 uv =
              fitImage(
                vUv,
                uResolution,
                uImageResolution
              );

            vec2 sampleUv =
              clamp(
                uv,
                0.001,
                0.999
              );


            float faceMask =
              ellipseMask(
                sampleUv,
                uFaceCenter,
                uFaceSize
              );


            float bodyMask =
              ellipseMask(
                sampleUv,
                uBodyCenter,
                uBodySize
              );


            float subjectMask =
              max(
                faceMask,
                bodyMask *
                0.86
              );


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


            float n1 =
              noise(
                sampleUv *
                4.0 +
                vec2(
                  uTime *
                  0.025,
                  -uTime *
                  0.016
                )
              );


            float n2 =
              noise(
                sampleUv *
                15.0 -
                vec2(
                  uTime *
                  0.04,
                  uTime *
                  0.03
                )
              );


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


            float vertical =
              (
                noise(
                  vec2(
                    sampleUv.x *
                    80.0,
                    uTime *
                    6.0
                  )
                ) -
                0.5
              ) *
              subjectMask *
              0.008;


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


            float rgbShift =
              (
                0.002 +
                motion *
                0.008
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


            vec3 cleanColor =
              texture2D(
                uTexture,
                sampleUv
              ).rgb;


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


            float fragmentNoise =
              noise(
                sampleUv *
                46.0 +
                uTime *
                2.0
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
                fragmentation *
                0.46
              );


            color =
              pow(
                color,
                vec3(
                  0.88
                )
              );

            color *=
              1.12;


            color +=
              vec3(
                0.008,
                0.014,
                0.032
              );


            float vignette =
              1.0 -
              smoothstep(
                0.60,
                0.94,
                length(
                  vUv -
                  0.5
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

    materialRef.current = material;

    /*
     * ==========================================================
     * GEOMETRY
     * ==========================================================
     */

    geometry =
      new THREE.PlaneGeometry(
        2,
        2
      );

    geometryRef.current =
      geometry;

    mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    scene.add(mesh);

    /*
     * ==========================================================
     * RESIZE
     * ==========================================================
     */

    const resize = () => {
      if (
        destroyedRef.current ||
        !renderer ||
        !material
      ) {
        return;
      }

      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      if (
        width === 0 ||
        height === 0
      ) {
        return;
      }

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );

      renderer.setSize(
        width,
        height,
        false
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

    /*
     * ResizeObserver helps with layout-driven size changes,
     * not just browser-window resize.
     */

    const resizeObserver =
      new ResizeObserver(() => {
        resize();
      });

    resizeObserver.observe(
      container
    );

    resize();

    /*
     * ==========================================================
     * FACE DETECTOR
     * ==========================================================
     */

    const loadDetector =
      async () => {
        if (
          destroyedRef.current ||
          detectorRef.current
        ) {
          return detectorRef.current;
        }

        const vision =
          await FilesetResolver.forVisionTasks(
            WASM_PATH
          );

        if (
          destroyedRef.current
        ) {
          return null;
        }

        const detector =
          await FaceDetector.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  FACE_MODEL,
              },

              runningMode: "IMAGE",

              minDetectionConfidence:
                0.25,

              minSuppressionThreshold:
                0.30,
            }
          );

        if (
          destroyedRef.current
        ) {
          detector.close();
          return null;
        }

        detectorRef.current =
          detector;

        return detector;
      };

    /*
     * ==========================================================
     * FACE DETECTION WITH RETRIES
     * ==========================================================
     */

    const detectFace =
      async () => {
        if (
          detectingRef.current ||
          destroyedRef.current
        ) {
          return;
        }

        detectingRef.current =
          true;

        try {
          const image =
            new Image();

          image.src =
            heroImage;

          /*
           * decode() is more reliable than relying only on
           * onload for this kind of startup asset.
           */

          await new Promise(
            (
              resolve,
              reject
            ) => {
              image.onload =
                resolve;

              image.onerror =
                reject;
            }
          );

          if (
            image.decode
          ) {
            try {
              await image.decode();
            } catch {
              // onload already completed; continue
            }
          }

          const detector =
            await loadDetector();

          if (
            !detector ||
            destroyedRef.current
          ) {
            return;
          }

          /*
           * Try the detector up to three times.
           *
           * This is especially useful for your heavily
           * distorted portrait.
           */

          let result = null;

          for (
            let attempt = 0;
            attempt < 3;
            attempt++
          ) {
            if (
              destroyedRef.current
            ) {
              return;
            }

            result =
              detector.detect(
                image
              );

            if (
              result?.detections?.length
            ) {
              break;
            }

            await new Promise(
              (resolve) =>
                setTimeout(
                  resolve,
                  80
                )
            );
          }

          if (
            !result?.detections?.length
          ) {
            console.warn(
              "Hero face detection did not find a face after 3 attempts. Keeping fallback region."
            );

            return;
          }

          /*
           * Prefer the highest confidence detection.
           */

          const detection =
            [...result.detections].sort(
              (a, b) =>
                (
                  b.categories?.[0]
                    ?.score ?? 0
                ) -
                (
                  a.categories?.[0]
                    ?.score ?? 0
                )
            )[0];

          const box =
            detection?.boundingBox;

          if (!box) {
            return;
          }

          const imageWidth =
            image.naturalWidth;

          const imageHeight =
            image.naturalHeight;

          const centerX =
            (
              box.originX +
              box.width *
                0.5
            ) /
            imageWidth;

          const centerY =
            1 -
            (
              box.originY +
              box.height *
                0.5
            ) /
            imageHeight;

          const width =
            box.width /
            imageWidth;

          const height =
            box.height /
            imageHeight;

          /*
           * Face + hair.
           */

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

          /*
           * Upper body + neck.
           */

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
        } catch (error) {
          console.warn(
            "Hero face detection failed. Using fallback region.",
            error
          );
        } finally {
          detectingRef.current =
            false;
        }
      };

    /*
     * Start detection without making it part of the
     * animation loop.
     */

    detectFace();

    /*
     * ==========================================================
     * ANIMATION
     * ==========================================================
     */

    const clock =
      new THREE.Clock();

    const animate =
      () => {
        if (
          destroyedRef.current
        ) {
          return;
        }

        animationFrameRef.current =
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

    /*
     * ==========================================================
     * CLEANUP
     * ==========================================================
     */

    return () => {
      destroyedRef.current =
        true;

      cancelAnimationFrame(
        animationFrameRef.current
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

      resizeObserver.disconnect();

      canvas.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );

      canvas.removeEventListener(
        "webglcontextrestored",
        handleContextRestored
      );

      /*
       * Detector closes ONLY on actual component cleanup.
       */

      if (
        detectorRef.current
      ) {
        try {
          detectorRef.current.close();
        } catch {
          // already closed
        }

        detectorRef.current =
          null;
      }

      geometry?.dispose();
      material?.dispose();
      texture?.dispose();

      renderer?.dispose();

      /*
       * Remove canvas only if it is still ours.
       */

      if (
        renderer?.domElement &&
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }

      rendererRef.current =
        null;

      sceneRef.current =
        null;

      cameraRef.current =
        null;

      materialRef.current =
        null;

      geometryRef.current =
        null;

      textureRef.current =
        null;

      initializedRef.current =
        false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        absolute
        inset-0
        h-full
        w-full
        overflow-hidden
      "
    />
  );
};

export default Backdrop;