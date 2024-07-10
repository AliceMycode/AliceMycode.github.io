define(["exports","./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./Transforms-e3538a05","./ComponentDatatype-6d99a1ee","./GeometryAttribute-8143c9e5","./GeometryAttributes-4fcfcf40","./Plane-4d7ecfed","./VertexFormat-7572c785"],function(t,F,e,i,V,E,O,P,z,f,l){"use strict";function h(t){this.planes=F.defaultValue(t,[])}var p=[new V.Cartesian3,new V.Cartesian3,new V.Cartesian3];V.Cartesian3.clone(V.Cartesian3.UNIT_X,p[0]),V.Cartesian3.clone(V.Cartesian3.UNIT_Y,p[1]),V.Cartesian3.clone(V.Cartesian3.UNIT_Z,p[2]);var c=new V.Cartesian3,d=new V.Cartesian3,u=new f.Plane(new V.Cartesian3(1,0,0),0);function r(t){t=F.defaultValue(t,F.defaultValue.EMPTY_OBJECT),this.left=t.left,this._left=void 0,this.right=t.right,this._right=void 0,this.top=t.top,this._top=void 0,this.bottom=t.bottom,this._bottom=void 0,this.near=F.defaultValue(t.near,1),this._near=this.near,this.far=F.defaultValue(t.far,5e8),this._far=this.far,this._cullingVolume=new h,this._orthographicMatrix=new E.Matrix4}function s(t){t.top===t._top&&t.bottom===t._bottom&&t.left===t._left&&t.right===t._right&&t.near===t._near&&t.far===t._far||(t._left=t.left,t._right=t.right,t._top=t.top,t._bottom=t.bottom,t._near=t.near,t._far=t.far,t._orthographicMatrix=E.Matrix4.computeOrthographicOffCenter(t.left,t.right,t.bottom,t.top,t.near,t.far,t._orthographicMatrix))}h.fromBoundingSphere=function(t,e){F.defined(e)||(e=new h);var a=p.length,i=e.planes;i.length=2*a;for(var r=t.center,n=t.radius,o=0,s=0;s<a;++s){var f=p[s],u=i[o],l=i[o+1];F.defined(u)||(u=i[o]=new E.Cartesian4),F.defined(l)||(l=i[o+1]=new E.Cartesian4),V.Cartesian3.multiplyByScalar(f,-n,c),V.Cartesian3.add(r,c,c),u.x=f.x,u.y=f.y,u.z=f.z,u.w=-V.Cartesian3.dot(f,c),V.Cartesian3.multiplyByScalar(f,n,c),V.Cartesian3.add(r,c,c),l.x=-f.x,l.y=-f.y,l.z=-f.z,l.w=-V.Cartesian3.dot(V.Cartesian3.negate(f,d),c),o+=2}return e},h.prototype.computeVisibility=function(t){for(var e=this.planes,a=!1,i=0,r=e.length;i<r;++i){var n=t.intersectPlane(f.Plane.fromCartesian4(e[i],u));if(n===E.Intersect.OUTSIDE)return E.Intersect.OUTSIDE;n===E.Intersect.INTERSECTING&&(a=!0)}return a?E.Intersect.INTERSECTING:E.Intersect.INSIDE},h.prototype.computeVisibilityWithPlaneMask=function(t,e){if(e===h.MASK_OUTSIDE||e===h.MASK_INSIDE)return e;for(var a=h.MASK_INSIDE,i=this.planes,r=0,n=i.length;r<n;++r){var o=r<31?1<<r:0;if(!(r<31&&0==(e&o))){var s=t.intersectPlane(f.Plane.fromCartesian4(i[r],u));if(s===E.Intersect.OUTSIDE)return h.MASK_OUTSIDE;s===E.Intersect.INTERSECTING&&(a|=o)}}return a},h.MASK_OUTSIDE=4294967295,h.MASK_INSIDE=0,h.MASK_INDETERMINATE=2147483647,Object.defineProperties(r.prototype,{projectionMatrix:{get:function(){return s(this),this._orthographicMatrix}}});var m=new V.Cartesian3,C=new V.Cartesian3,_=new V.Cartesian3,y=new V.Cartesian3;function v(t){t=F.defaultValue(t,F.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new r,this.width=t.width,this._width=void 0,this.aspectRatio=t.aspectRatio,this._aspectRatio=void 0,this.near=F.defaultValue(t.near,1),this._near=this.near,this.far=F.defaultValue(t.far,5e8),this._far=this.far}function n(t){var e,a=t._offCenterFrustum;t.width===t._width&&t.aspectRatio===t._aspectRatio&&t.near===t._near&&t.far===t._far||(t._aspectRatio=t.aspectRatio,t._width=t.width,t._near=t.near,t._far=t.far,e=1/t.aspectRatio,a.right=.5*t.width,a.left=-a.right,a.top=e*a.right,a.bottom=-a.top,a.near=t.near,a.far=t.far)}function o(t){t=F.defaultValue(t,F.defaultValue.EMPTY_OBJECT),this.left=t.left,this._left=void 0,this.right=t.right,this._right=void 0,this.top=t.top,this._top=void 0,this.bottom=t.bottom,this._bottom=void 0,this.near=F.defaultValue(t.near,1),this._near=this.near,this.far=F.defaultValue(t.far,5e8),this._far=this.far,this._cullingVolume=new h,this._perspectiveMatrix=new E.Matrix4,this._infinitePerspective=new E.Matrix4}function g(t){var e=t.top,a=t.bottom,i=t.right,r=t.left,n=t.near,o=t.far;e===t._top&&a===t._bottom&&r===t._left&&i===t._right&&n===t._near&&o===t._far||(t._left=r,t._right=i,t._top=e,t._bottom=a,t._near=n,t._far=o,t._perspectiveMatrix=E.Matrix4.computePerspectiveOffCenter(r,i,a,e,n,o,t._perspectiveMatrix),t._infinitePerspective=E.Matrix4.computeInfinitePerspectiveOffCenter(r,i,a,e,n,t._infinitePerspective))}r.prototype.computeCullingVolume=function(t,e,a){var i=this._cullingVolume.planes,r=this.top,n=this.bottom,o=this.right,s=this.left,f=this.near,u=this.far,l=V.Cartesian3.cross(e,a,m);V.Cartesian3.normalize(l,l);var h=C;V.Cartesian3.multiplyByScalar(e,f,h),V.Cartesian3.add(t,h,h);var p=_;V.Cartesian3.multiplyByScalar(l,s,p),V.Cartesian3.add(h,p,p);var c=i[0];return F.defined(c)||(c=i[0]=new E.Cartesian4),c.x=l.x,c.y=l.y,c.z=l.z,c.w=-V.Cartesian3.dot(l,p),V.Cartesian3.multiplyByScalar(l,o,p),V.Cartesian3.add(h,p,p),c=i[1],F.defined(c)||(c=i[1]=new E.Cartesian4),c.x=-l.x,c.y=-l.y,c.z=-l.z,c.w=-V.Cartesian3.dot(V.Cartesian3.negate(l,y),p),V.Cartesian3.multiplyByScalar(a,n,p),V.Cartesian3.add(h,p,p),c=i[2],F.defined(c)||(c=i[2]=new E.Cartesian4),c.x=a.x,c.y=a.y,c.z=a.z,c.w=-V.Cartesian3.dot(a,p),V.Cartesian3.multiplyByScalar(a,r,p),V.Cartesian3.add(h,p,p),c=i[3],F.defined(c)||(c=i[3]=new E.Cartesian4),c.x=-a.x,c.y=-a.y,c.z=-a.z,c.w=-V.Cartesian3.dot(V.Cartesian3.negate(a,y),p),c=i[4],F.defined(c)||(c=i[4]=new E.Cartesian4),c.x=e.x,c.y=e.y,c.z=e.z,c.w=-V.Cartesian3.dot(e,h),V.Cartesian3.multiplyByScalar(e,u,p),V.Cartesian3.add(t,p,p),c=i[5],F.defined(c)||(c=i[5]=new E.Cartesian4),c.x=-e.x,c.y=-e.y,c.z=-e.z,c.w=-V.Cartesian3.dot(V.Cartesian3.negate(e,y),p),this._cullingVolume},r.prototype.getPixelDimensions=function(t,e,a,i,r){s(this);var n=i*(this.right-this.left)/t,o=i*(this.top-this.bottom)/e;return r.x=n,r.y=o,r},r.prototype.clone=function(t){return F.defined(t)||(t=new r),t.left=this.left,t.right=this.right,t.top=this.top,t.bottom=this.bottom,t.near=this.near,t.far=this.far,t._left=void 0,t._right=void 0,t._top=void 0,t._bottom=void 0,t._near=void 0,t._far=void 0,t},r.prototype.equals=function(t){return F.defined(t)&&t instanceof r&&this.right===t.right&&this.left===t.left&&this.top===t.top&&this.bottom===t.bottom&&this.near===t.near&&this.far===t.far},r.prototype.equalsEpsilon=function(t,e,a){return t===this||F.defined(t)&&t instanceof r&&i.CesiumMath.equalsEpsilon(this.right,t.right,e,a)&&i.CesiumMath.equalsEpsilon(this.left,t.left,e,a)&&i.CesiumMath.equalsEpsilon(this.top,t.top,e,a)&&i.CesiumMath.equalsEpsilon(this.bottom,t.bottom,e,a)&&i.CesiumMath.equalsEpsilon(this.near,t.near,e,a)&&i.CesiumMath.equalsEpsilon(this.far,t.far,e,a)},v.packedLength=4,v.pack=function(t,e,a){return a=F.defaultValue(a,0),e[a++]=t.width,e[a++]=t.aspectRatio,e[a++]=t.near,e[a]=t.far,e},v.unpack=function(t,e,a){return e=F.defaultValue(e,0),F.defined(a)||(a=new v),a.width=t[e++],a.aspectRatio=t[e++],a.near=t[e++],a.far=t[e],a},Object.defineProperties(v.prototype,{projectionMatrix:{get:function(){return n(this),this._offCenterFrustum.projectionMatrix}}}),v.prototype.computeCullingVolume=function(t,e,a){return n(this),this._offCenterFrustum.computeCullingVolume(t,e,a)},v.prototype.getPixelDimensions=function(t,e,a,i,r){return n(this),this._offCenterFrustum.getPixelDimensions(t,e,a,i,r)},v.prototype.clone=function(t){return F.defined(t)||(t=new v),t.aspectRatio=this.aspectRatio,t.width=this.width,t.near=this.near,t.far=this.far,t._aspectRatio=void 0,t._width=void 0,t._near=void 0,t._far=void 0,this._offCenterFrustum.clone(t._offCenterFrustum),t},v.prototype.equals=function(t){return!!(F.defined(t)&&t instanceof v)&&(n(this),n(t),this.width===t.width&&this.aspectRatio===t.aspectRatio&&this._offCenterFrustum.equals(t._offCenterFrustum))},v.prototype.equalsEpsilon=function(t,e,a){return!!(F.defined(t)&&t instanceof v)&&(n(this),n(t),i.CesiumMath.equalsEpsilon(this.width,t.width,e,a)&&i.CesiumMath.equalsEpsilon(this.aspectRatio,t.aspectRatio,e,a)&&this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum,e,a))},Object.defineProperties(o.prototype,{projectionMatrix:{get:function(){return g(this),this._perspectiveMatrix}},infiniteProjectionMatrix:{get:function(){return g(this),this._infinitePerspective}}});var w=new V.Cartesian3,x=new V.Cartesian3,M=new V.Cartesian3,b=new V.Cartesian3;function R(t){t=F.defaultValue(t,F.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new o,this.fov=t.fov,this._fov=void 0,this._fovy=void 0,this._sseDenominator=void 0,this.aspectRatio=t.aspectRatio,this._aspectRatio=void 0,this.near=F.defaultValue(t.near,1),this._near=this.near,this.far=F.defaultValue(t.far,5e8),this._far=this.far,this.xOffset=F.defaultValue(t.xOffset,0),this._xOffset=this.xOffset,this.yOffset=F.defaultValue(t.yOffset,0),this._yOffset=this.yOffset}function S(t){var e=t._offCenterFrustum;t.fov===t._fov&&t.aspectRatio===t._aspectRatio&&t.near===t._near&&t.far===t._far&&t.xOffset===t._xOffset&&t.yOffset===t._yOffset||(t._aspectRatio=t.aspectRatio,t._fov=t.fov,t._fovy=t.aspectRatio<=1?t.fov:2*Math.atan(Math.tan(.5*t.fov)/t.aspectRatio),t._near=t.near,t._far=t.far,t._sseDenominator=2*Math.tan(.5*t._fovy),t._xOffset=t.xOffset,t._yOffset=t.yOffset,e.top=t.near*Math.tan(.5*t._fovy),e.bottom=-e.top,e.right=t.aspectRatio*e.top,e.left=-e.right,e.near=t.near,e.far=t.far,e.right+=t.xOffset,e.left+=t.xOffset,e.top+=t.yOffset,e.bottom+=t.yOffset)}o.prototype.computeCullingVolume=function(t,e,a){var i=this._cullingVolume.planes,r=this.top,n=this.bottom,o=this.right,s=this.left,f=this.near,u=this.far,l=V.Cartesian3.cross(e,a,w),h=x;V.Cartesian3.multiplyByScalar(e,f,h),V.Cartesian3.add(t,h,h);var p=M;V.Cartesian3.multiplyByScalar(e,u,p),V.Cartesian3.add(t,p,p);var c=b;V.Cartesian3.multiplyByScalar(l,s,c),V.Cartesian3.add(h,c,c),V.Cartesian3.subtract(c,t,c),V.Cartesian3.normalize(c,c),V.Cartesian3.cross(c,a,c),V.Cartesian3.normalize(c,c);var d=i[0];return F.defined(d)||(d=i[0]=new E.Cartesian4),d.x=c.x,d.y=c.y,d.z=c.z,d.w=-V.Cartesian3.dot(c,t),V.Cartesian3.multiplyByScalar(l,o,c),V.Cartesian3.add(h,c,c),V.Cartesian3.subtract(c,t,c),V.Cartesian3.cross(a,c,c),V.Cartesian3.normalize(c,c),d=i[1],F.defined(d)||(d=i[1]=new E.Cartesian4),d.x=c.x,d.y=c.y,d.z=c.z,d.w=-V.Cartesian3.dot(c,t),V.Cartesian3.multiplyByScalar(a,n,c),V.Cartesian3.add(h,c,c),V.Cartesian3.subtract(c,t,c),V.Cartesian3.cross(l,c,c),V.Cartesian3.normalize(c,c),d=i[2],F.defined(d)||(d=i[2]=new E.Cartesian4),d.x=c.x,d.y=c.y,d.z=c.z,d.w=-V.Cartesian3.dot(c,t),V.Cartesian3.multiplyByScalar(a,r,c),V.Cartesian3.add(h,c,c),V.Cartesian3.subtract(c,t,c),V.Cartesian3.cross(c,l,c),V.Cartesian3.normalize(c,c),d=i[3],F.defined(d)||(d=i[3]=new E.Cartesian4),d.x=c.x,d.y=c.y,d.z=c.z,d.w=-V.Cartesian3.dot(c,t),d=i[4],F.defined(d)||(d=i[4]=new E.Cartesian4),d.x=e.x,d.y=e.y,d.z=e.z,d.w=-V.Cartesian3.dot(e,h),V.Cartesian3.negate(e,c),d=i[5],F.defined(d)||(d=i[5]=new E.Cartesian4),d.x=c.x,d.y=c.y,d.z=c.z,d.w=-V.Cartesian3.dot(c,p),this._cullingVolume},o.prototype.getPixelDimensions=function(t,e,a,i,r){g(this);var n=1/this.near,o=2*i*a*(this.top*n)/e,s=2*i*a*(this.right*n)/t;return r.x=s,r.y=o,r},o.prototype.clone=function(t){return F.defined(t)||(t=new o),t.right=this.right,t.left=this.left,t.top=this.top,t.bottom=this.bottom,t.near=this.near,t.far=this.far,t._left=void 0,t._right=void 0,t._top=void 0,t._bottom=void 0,t._near=void 0,t._far=void 0,t},o.prototype.equals=function(t){return F.defined(t)&&t instanceof o&&this.right===t.right&&this.left===t.left&&this.top===t.top&&this.bottom===t.bottom&&this.near===t.near&&this.far===t.far},o.prototype.equalsEpsilon=function(t,e,a){return t===this||F.defined(t)&&t instanceof o&&i.CesiumMath.equalsEpsilon(this.right,t.right,e,a)&&i.CesiumMath.equalsEpsilon(this.left,t.left,e,a)&&i.CesiumMath.equalsEpsilon(this.top,t.top,e,a)&&i.CesiumMath.equalsEpsilon(this.bottom,t.bottom,e,a)&&i.CesiumMath.equalsEpsilon(this.near,t.near,e,a)&&i.CesiumMath.equalsEpsilon(this.far,t.far,e,a)},R.packedLength=6,R.pack=function(t,e,a){return a=F.defaultValue(a,0),e[a++]=t.fov,e[a++]=t.aspectRatio,e[a++]=t.near,e[a++]=t.far,e[a++]=t.xOffset,e[a]=t.yOffset,e},R.unpack=function(t,e,a){return e=F.defaultValue(e,0),F.defined(a)||(a=new R),a.fov=t[e++],a.aspectRatio=t[e++],a.near=t[e++],a.far=t[e++],a.xOffset=t[e++],a.yOffset=t[e],a},Object.defineProperties(R.prototype,{projectionMatrix:{get:function(){return S(this),this._offCenterFrustum.projectionMatrix}},infiniteProjectionMatrix:{get:function(){return S(this),this._offCenterFrustum.infiniteProjectionMatrix}},fovy:{get:function(){return S(this),this._fovy}},sseDenominator:{get:function(){return S(this),this._sseDenominator}}}),R.prototype.computeCullingVolume=function(t,e,a){return S(this),this._offCenterFrustum.computeCullingVolume(t,e,a)},R.prototype.getPixelDimensions=function(t,e,a,i,r){return S(this),this._offCenterFrustum.getPixelDimensions(t,e,a,i,r)},R.prototype.clone=function(t){return F.defined(t)||(t=new R),t.aspectRatio=this.aspectRatio,t.fov=this.fov,t.near=this.near,t.far=this.far,t._aspectRatio=void 0,t._fov=void 0,t._near=void 0,t._far=void 0,this._offCenterFrustum.clone(t._offCenterFrustum),t},R.prototype.equals=function(t){return!!(F.defined(t)&&t instanceof R)&&(S(this),S(t),this.fov===t.fov&&this.aspectRatio===t.aspectRatio&&this._offCenterFrustum.equals(t._offCenterFrustum))},R.prototype.equalsEpsilon=function(t,e,a){return!!(F.defined(t)&&t instanceof R)&&(S(this),S(t),i.CesiumMath.equalsEpsilon(this.fov,t.fov,e,a)&&i.CesiumMath.equalsEpsilon(this.aspectRatio,t.aspectRatio,e,a)&&this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum,e,a))};function T(t){var e,a,i=t.frustum,r=t.orientation,n=t.origin,o=F.defaultValue(t.vertexFormat,l.VertexFormat.DEFAULT),s=F.defaultValue(t._drawNearPlane,!0);i instanceof R?(e=0,a=R.packedLength):i instanceof v&&(e=1,a=v.packedLength),this._frustumType=e,this._frustum=i.clone(),this._origin=V.Cartesian3.clone(n),this._orientation=E.Quaternion.clone(r),this._drawNearPlane=s,this._vertexFormat=o,this._workerName="createFrustumGeometry",this.packedLength=2+a+V.Cartesian3.packedLength+E.Quaternion.packedLength+l.VertexFormat.packedLength}T.pack=function(t,e,a){a=F.defaultValue(a,0);var i=t._frustumType,r=t._frustum;return 0===(e[a++]=i)?(R.pack(r,e,a),a+=R.packedLength):(v.pack(r,e,a),a+=v.packedLength),V.Cartesian3.pack(t._origin,e,a),a+=V.Cartesian3.packedLength,E.Quaternion.pack(t._orientation,e,a),a+=E.Quaternion.packedLength,l.VertexFormat.pack(t._vertexFormat,e,a),e[a+=l.VertexFormat.packedLength]=t._drawNearPlane?1:0,e};var k=new R,A=new v,D=new E.Quaternion,I=new V.Cartesian3,q=new l.VertexFormat;function B(t,e,a,i,r,n,o,s){for(var f=t/3*2,u=0;u<4;++u)F.defined(e)&&(e[t]=n.x,e[t+1]=n.y,e[t+2]=n.z),F.defined(a)&&(a[t]=o.x,a[t+1]=o.y,a[t+2]=o.z),F.defined(i)&&(i[t]=s.x,i[t+1]=s.y,i[t+2]=s.z),t+=3;r[f]=0,r[1+f]=0,r[2+f]=1,r[3+f]=0,r[4+f]=1,r[5+f]=1,r[6+f]=0,r[7+f]=1}T.unpack=function(t,e,a){e=F.defaultValue(e,0);var i,r=t[e++];0===r?(i=R.unpack(t,e,k),e+=R.packedLength):(i=v.unpack(t,e,A),e+=v.packedLength);var n=V.Cartesian3.unpack(t,e,I);e+=V.Cartesian3.packedLength;var o=E.Quaternion.unpack(t,e,D);e+=E.Quaternion.packedLength;var s=l.VertexFormat.unpack(t,e,q),f=1===t[e+=l.VertexFormat.packedLength];if(!F.defined(a))return new T({frustum:i,origin:n,orientation:o,vertexFormat:s,_drawNearPlane:f});var u=r===a._frustumType?a._frustum:void 0;return a._frustum=i.clone(u),a._frustumType=r,a._origin=V.Cartesian3.clone(n,a._origin),a._orientation=E.Quaternion.clone(o,a._orientation),a._vertexFormat=l.VertexFormat.clone(s,a._vertexFormat),a._drawNearPlane=f,a};var L=new E.Matrix3,N=new E.Matrix4,G=new E.Matrix4,j=new V.Cartesian3,U=new V.Cartesian3,Q=new V.Cartesian3,K=new V.Cartesian3,Y=new V.Cartesian3,J=new V.Cartesian3,W=new Array(3),X=new Array(4);X[0]=new E.Cartesian4(-1,-1,1,1),X[1]=new E.Cartesian4(1,-1,1,1),X[2]=new E.Cartesian4(1,1,1,1),X[3]=new E.Cartesian4(-1,1,1,1);for(var Z=new Array(4),a=0;a<4;++a)Z[a]=new E.Cartesian4;T._computeNearFarPlanes=function(t,e,a,i,r,n,o,s){var f=E.Matrix3.fromQuaternion(e,L),u=F.defaultValue(n,j),l=F.defaultValue(o,U),h=F.defaultValue(s,Q),u=E.Matrix3.getColumn(f,0,u),l=E.Matrix3.getColumn(f,1,l),h=E.Matrix3.getColumn(f,2,h);V.Cartesian3.normalize(u,u),V.Cartesian3.normalize(l,l),V.Cartesian3.normalize(h,h),V.Cartesian3.negate(u,u);var p,c,d,m,C=E.Matrix4.computeView(t,h,l,u,N);0===a?(c=i.projectionMatrix,d=E.Matrix4.multiply(c,C,G),m=E.Matrix4.inverse(d,G)):p=E.Matrix4.inverseTransformation(C,G),F.defined(m)?(W[0]=i.near,W[1]=i.far):(W[0]=0,W[1]=i.near,W[2]=i.far);for(var _=0;_<2;++_)for(var y=0;y<4;++y){var v,g,w,x,M=E.Cartesian4.clone(X[y],Z[y]);F.defined(m)?(v=1/(M=E.Matrix4.multiplyByVector(m,M,M)).w,V.Cartesian3.multiplyByScalar(M,v,M),V.Cartesian3.subtract(M,t,M),V.Cartesian3.normalize(M,M),g=V.Cartesian3.dot(h,M),V.Cartesian3.multiplyByScalar(M,W[_]/g,M),V.Cartesian3.add(M,t,M)):(F.defined(i._offCenterFrustum)&&(i=i._offCenterFrustum),w=W[_],x=W[_+1],M.x=.5*(M.x*(i.right-i.left)+i.left+i.right),M.y=.5*(M.y*(i.top-i.bottom)+i.bottom+i.top),M.z=.5*(M.z*(w-x)-w-x),M.w=1,E.Matrix4.multiplyByVector(p,M,M)),r[12*_+3*y]=M.x,r[12*_+3*y+1]=M.y,r[12*_+3*y+2]=M.z}},T.createGeometry=function(t){var e=t._frustumType,a=t._frustum,i=t._origin,r=t._orientation,n=t._drawNearPlane,o=t._vertexFormat,s=n?6:5,f=new Float64Array(72);T._computeNearFarPlanes(i,r,e,a,f);var u=24;f[u]=f[12],f[u+1]=f[13],f[u+2]=f[14],f[u+3]=f[0],f[u+4]=f[1],f[u+5]=f[2],f[u+6]=f[9],f[u+7]=f[10],f[u+8]=f[11],f[u+9]=f[21],f[u+10]=f[22],f[u+11]=f[23],f[u+=12]=f[15],f[u+1]=f[16],f[u+2]=f[17],f[u+3]=f[3],f[u+4]=f[4],f[u+5]=f[5],f[u+6]=f[0],f[u+7]=f[1],f[u+8]=f[2],f[u+9]=f[12],f[u+10]=f[13],f[u+11]=f[14],f[u+=12]=f[3],f[u+1]=f[4],f[u+2]=f[5],f[u+3]=f[15],f[u+4]=f[16],f[u+5]=f[17],f[u+6]=f[18],f[u+7]=f[19],f[u+8]=f[20],f[u+9]=f[6],f[u+10]=f[7],f[u+11]=f[8],f[u+=12]=f[6],f[u+1]=f[7],f[u+2]=f[8],f[u+3]=f[18],f[u+4]=f[19],f[u+5]=f[20],f[u+6]=f[21],f[u+7]=f[22],f[u+8]=f[23],f[u+9]=f[9],f[u+10]=f[10],f[u+11]=f[11],n||(f=f.subarray(12));var l,h,p,c,d,m,C,_,y,v,g=new z.GeometryAttributes({position:new P.GeometryAttribute({componentDatatype:O.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f})});(F.defined(o.normal)||F.defined(o.tangent)||F.defined(o.bitangent)||F.defined(o.st))&&(l=F.defined(o.normal)?new Float32Array(12*s):void 0,h=F.defined(o.tangent)?new Float32Array(12*s):void 0,p=F.defined(o.bitangent)?new Float32Array(12*s):void 0,c=F.defined(o.st)?new Float32Array(8*s):void 0,d=j,m=U,C=Q,_=V.Cartesian3.negate(d,K),y=V.Cartesian3.negate(m,Y),v=V.Cartesian3.negate(C,J),u=0,n&&(B(u,l,h,p,c,v,d,m),u+=12),B(u,l,h,p,c,C,_,m),B(u+=12,l,h,p,c,_,v,m),B(u+=12,l,h,p,c,y,v,_),B(u+=12,l,h,p,c,d,C,m),B(u+=12,l,h,p,c,m,C,_),F.defined(l)&&(g.normal=new P.GeometryAttribute({componentDatatype:O.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:l})),F.defined(h)&&(g.tangent=new P.GeometryAttribute({componentDatatype:O.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),F.defined(p)&&(g.bitangent=new P.GeometryAttribute({componentDatatype:O.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:p})),F.defined(c)&&(g.st=new P.GeometryAttribute({componentDatatype:O.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:c})));for(var w=new Uint16Array(6*s),x=0;x<s;++x){var M=6*x,b=4*x;w[M]=b,w[1+M]=1+b,w[2+M]=2+b,w[3+M]=b,w[4+M]=2+b,w[5+M]=3+b}return new P.Geometry({attributes:g,indices:w,primitiveType:P.PrimitiveType.TRIANGLES,boundingSphere:E.BoundingSphere.fromVertices(f)})},t.FrustumGeometry=T,t.OrthographicFrustum=v,t.PerspectiveFrustum=R});
