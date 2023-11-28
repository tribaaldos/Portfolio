import React from "react";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
const ShaderMat = shaderMaterial(
  {
    uTime: 1,
    uResolution: new THREE.Vector2(),
    uDisplace: 0.9,
    uSpread: 3.0,
    uNoise: 16,
  },
  // vertex shader
  /*glsl*/ `
//VERTEX
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPattern;

uniform vec2 uResolution;
uniform float uTime;
uniform float uDisplace;
uniform float uSpread;
uniform float uNoise;


#define PI 3.14159265358979
#define MOD3 vec3(.1031,.11369,.13787)

vec3 hash33(vec3 p3) {
	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

float pnoise(vec3 p) {
    vec3 pi = floor(p);
    vec3 pf = p - pi;
    vec3 w = pf * pf * (3. - 2.0 * pf);
    return 	mix(
        		mix(
                	mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                        dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                       	w.x),
                	mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                        dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                       	w.x),
                	w.z),
        		mix(
                    mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                        dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                       	w.x),
                   	mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                        dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                       	w.x),
                	w.z),
    			w.y);
}

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    
    float pat = pnoise(vec3(vUv * uNoise , sin(uTime) * 3.0 )) * uDisplace ;
    float proximity = abs(vUv.x - (.5 + sin(uTime)/(12. * uSpread ) ));

    vec3 full = pat * vec3(clamp(.23 * uSpread  - proximity , 0., 1.));
    vec3 newPosition = vPosition + vNormal * full; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

`,
  // fragment shader
  /*glsl*/ `
// FRAGMENT
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPattern;

uniform vec2 uResolution;
uniform float uTime;
uniform float uDisplace;
uniform float uSpread;
uniform float uNoise;

#define PI 3.14159265358979
#define MOD3 vec3(.1031,.11369,.13787)

vec3 hash33(vec3 p3) {
	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}
float pnoise(vec3 p) {
    vec3 pi = floor(p);
    vec3 pf = p - pi;
    vec3 w = pf * pf * (3. - 2.0 * pf);
    return 	mix(
        		mix(
                	mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                        dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                       	w.x),
                	mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                        dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                       	w.x),
                	w.z),
        		mix(
                    mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                        dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                       	w.x),
                   	mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                        dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                       	w.x),
                	w.z),
    			w.y);
}

void main() {
    float pat = pnoise(vec3(vUv * uNoise , sin(uTime) * 1.4 )) * uDisplace ;
    float proximity = abs(vUv.x - (.5 + sin(uTime)/(12. * uSpread ) ));

    vec3 full = pat * vec3(clamp(.23 * uSpread  - proximity , 0., 1.));
    vec3 newPosition = vPosition + vNormal * full; 
    vec3 darkRedColor = vec3(0.5, 0.1, 1.0); // Dark red color (R: 0.5, G: 0.0, B: 0.0)
    vec3 color = -vec3(pnoise(vec3(1. - newPosition.z * 35.))*40.) * (.01 -full) * darkRedColor;
  gl_FragColor = vec4(color , 1.);
}

`
);
extend({ ShaderMat });


export function Ball(props) {
  const ref = useRef();
  useFrame((state) => {
    if(ref.current) {
        ref.current.uTime = state.clock.elapsedTime;
    }
  })
  return (
    <group {...props} dispose={null}>
      <mesh>
        <torusGeometry />
        <shaderMat ref={ref} key={ShaderMat.key} distort={1} speed={5}/>
      </mesh>
    </group>
  );
}
