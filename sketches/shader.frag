#ifdef GL_ES
precision highp float;
#endif

uniform vec2 iResolution;
uniform int iFrame;
uniform vec2 iMouse;

float hash( float n )
			{
			    return fract(sin(n)*15.5453);
			}

			float noise( vec3 x )
			{
			    // The noise function returns a value in the range -1.0f -> 1.0f

			    vec3 p = floor(x);
			    vec3 f = fract(x);

			    f       = f*f*(3.0-2.0*f);
			    float n = p.x + p.y*57.0 + 113.0*p.z;

			    return mix(
                  mix(
                    mix( hash(n+0.0), hash(n+1.0),f.x),
			        			mix( hash(n+57.0), hash(n+58.0),f.x),f.y),
			        			mix(
                      mix( hash(n+113.0), hash(n+114.0),f.x),
			          			mix( hash(n+170.0), hash(n+171.0),f.x),
                    f.y),
                  f.z)-.62;
			}


void main()
{

    //Animation speed
    vec3 t = (float(iFrame)*vec3(1.0,2.0,3.0)/1.0)/1000.0;//+iMouse.xyz/1000.0;


    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/iResolution;
    uv=uv/3.0+0.99;
    uv-=iMouse.xy/iResolution.xy/4.0;

    vec3 col = vec3(-1.4);

    for(int i = 0; i < 8; i++){
      float i2 = float(i)*1.0;
      col.r+=noise(uv.xyy*(0.0+i2)+col.rgb);
      col.g+=noise(uv.xyx*(2.5+i2)+col.rgb+t*sign(sin(i2/5.1)));
      col.b+=noise(uv.yyx*(5.0+i2)+col.rgb+t*sign(sin(i2/5.1)));
	}


    for(int i = 0; i < 4; i++){
      float i2 = float(i)*1.0;
      col.r+=noise(uv.xyy*(0.0)+col.rgb);
      col.g+=noise(uv.xyx*(2.0)+col.rgb+t*sign(sin(i2/1.0)));
      col.b-=noise(uv.yyx*(5.0)+col.rgb+t*sign(sin(i2/1.0)));
    }
    col.rgb/=500.0;
    col.rgb=mix(col.rgb,normalize(col.rgb)*1.0,1.0);
    col.rgb+=1.2;

    // Output to screen
    gl_FragColor = vec4(col,1.0);
}