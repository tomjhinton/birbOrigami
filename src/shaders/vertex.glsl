const float PI = 3.1415926535897932384626433832795;

uniform vec2 uMouse;
uniform float uTime;
varying float vTime;
varying vec2 vUv;
uniform vec2 uFrequency;
uniform vec3 uPosition;
uniform vec3 uRotation;
uniform vec2 uResolution;

uniform float uValueA;
uniform float uValueB;
uniform float uValueC;
uniform float uValueD;




vec2 rotateUV(vec2 uv, vec2 pivot, float rotation) {
  mat2 rotation_matrix=mat2(  vec2(sin(rotation),-cos(rotation)),
                              vec2(cos(rotation),sin(rotation))
                              );
  uv -= pivot;
  uv= uv*rotation_matrix;
  uv += pivot;
  return uv;
}

vec3 opTwist( vec3 p , float amount)
{
    float  c = cos(( amount)*p.y * amount);
    float  s = sin( (amount)*p.y* amount);
    mat2   m = mat2(c,-s,s,c);
    return vec3(m*p.xz,p.y);
}

vec3 opCheapBend( vec3 p )
{
    float c = cos(2.0*p.y);
    float s = sin(2.0*p.y);
    mat2  m = mat2(c,-s,s,c);
    return vec3(m*p.xy,p.z);
}
void main()

{




  vec4 modelPosition = modelMatrix * vec4(position, 1.0);


  modelPosition.xyz += opTwist(  modelPosition.xyz , uValueA *.1);



  modelPosition.xyz += uValueA * .1 * cos(3. * modelPosition.yzx ) *modelPosition.x;

      modelPosition.xyz += opCheapBend(  modelPosition.xyz * uValueB *.1);


  modelPosition.xyz += uValueB * .05 * cos(11. * modelPosition.yzx ) *modelPosition.y;
  modelPosition.xyz += uValueC * .025 * cos(17. * modelPosition.yzx )*modelPosition.z;


  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;



  // gl_Position = vec4(position, 1.0);
  // //

  vUv = uv;
  vTime = uTime;

}
