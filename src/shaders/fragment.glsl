const float PI = 3.1415926535897932384626433832795;
const float TAU = 2.* PI;
uniform vec3 uColor;
uniform vec3 uPosition;
uniform vec3 uRotation;
uniform vec2 uResolution;
uniform sampler2D uTexture;

uniform vec2 uMouse;



varying vec2 vUv;
varying float vElevation;
varying float vTime;

precision highp float;

#define PI 3.14159265359

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx );
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx );
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx );
}


void main() {
	vec2 uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy;
  uv = vUv;

	vec3 color = vec3(uv.x, uv.y, 1.);

	coswarp(color, 3.);

    gl_FragColor = vec4(color, 1.);
}
