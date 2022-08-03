const float PI = 3.1415926535897932384626433832795;
const float TAU = 2.* PI;
uniform vec3 uColor;
uniform vec3 uPosition;
uniform vec3 uRotation;
uniform vec2 uResolution;


uniform vec2 uMouse;



varying vec2 vUv;
varying float vTime;

precision highp float;

#define PI 3.14159265359

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx );
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx );
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx );
}

vec2 brownConradyDistortion(in vec2 uv, in float k1, in float k2)
{
    uv = uv * 2.0 - 1.0;	// brown conrady takes [-1:1]

    // positive values of K1 give barrel distortion, negative give pincushion
    float r2 = uv.x*uv.x + uv.y*uv.y;
    uv *= 1.0 + k1 * r2 + k2 * r2 * r2;

    // tangential distortion (due to off center lens elements)
    // is not modeled in this function, but if it was, the terms would go here

    uv = (uv * .5 + .5);	// restore -> [0:1]
    return uv;
}


void main() {
	vec2 uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy;
  uv = vUv;



	// vec3 color = vec3(uv.x, uv.y, 1.);
	//
	// coswarp(color, 3.);

    gl_FragColor = vec4(vec3(1.), .8);
}
