define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./Transforms-e3538a05","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-8143c9e5","./GeometryAttributes-4fcfcf40","./AttributeCompression-88d6db09","./GeometryPipeline-ffa5acc4","./EncodedCartesian3-e3c09f89","./IndexDatatype-53503fee","./IntersectionTests-0d5a0359","./Plane-4d7ecfed","./GeometryOffsetAttribute-7350d9af","./VertexFormat-7572c785","./GeometryInstance-a62f6511","./arrayRemoveDuplicates-ebc732b0","./BoundingRectangle-7f9655b3","./EllipsoidTangentPlane-4bd05bf7","./ArcType-dc1c5aee","./EllipsoidRhumbLine-a69f63ad","./PolygonPipeline-bd6e6ddf","./PolygonGeometryLibrary-8014f84f","./EllipsoidGeodesic-9bc1521b"],function(Y,e,U,j,Q,t,r,q,K,a,o,D,i,L,n,s,Z,b,N,l,u,H,p,c,R,M,y){"use strict";var J=new j.Cartographic,X=new j.Cartographic;var S=new u.BoundingRectangle,$=new j.Cartesian3,ee=new j.Cartesian3,te=new j.Cartesian3,re=new j.Cartesian3,ae=new j.Cartesian3,oe=new j.Cartesian3,ie=new j.Cartesian3,ne=new j.Cartesian3,se=new j.Cartesian3,le=new j.Cartesian2,ue=new j.Cartesian2,ce=new j.Cartesian3,pe=new Q.Quaternion,ye=new Q.Matrix3,me=new Q.Matrix3;function B(e){var t,r,a,o=e.vertexFormat,i=e.geometry,n=e.shadowVolume,s=i.attributes.position.values,l=s.length,u=e.wall,c=e.top||u,p=e.bottom||u;if(o.st||o.normal||o.tangent||o.bitangent||n){var y=e.boundingRectangle,m=e.tangentPlane,g=e.ellipsoid,d=e.stRotation,h=e.perPositionHeight,f=le;f.x=y.x,f.y=y.y;var b,v=o.st?new Float32Array(l/3*2):void 0;o.normal&&(b=h&&c&&!u?i.attributes.normal.values:new Float32Array(l));var _,P=o.tangent?new Float32Array(l):void 0,C=o.bitangent?new Float32Array(l):void 0,w=n?new Float32Array(l):void 0,x=0,T=0,I=ee,A=te,E=re,G=!0,O=ye,V=me;V=0!==d?(_=Q.Quaternion.fromAxisAngle(m._plane.normal,d,pe),O=Q.Matrix3.fromQuaternion(_,O),_=Q.Quaternion.fromAxisAngle(m._plane.normal,-d,pe),Q.Matrix3.fromQuaternion(_,V)):(O=Q.Matrix3.clone(Q.Matrix3.IDENTITY,O),Q.Matrix3.clone(Q.Matrix3.IDENTITY,V));var F=0,D=0;c&&p&&(F=l/2,D=l/3,l/=2);for(var L=0;L<l;L+=3){var N,H,R,M,S,B,k,z,W=j.Cartesian3.fromArray(s,L,ce);o.st&&(N=Q.Matrix3.multiplyByVector(O,W,$),N=g.scaleToGeodeticSurface(N,N),H=m.projectPointOntoPlane(N,ue),j.Cartesian2.subtract(H,f,H),R=U.CesiumMath.clamp(H.x/y.width,0,1),M=U.CesiumMath.clamp(H.y/y.height,0,1),p&&(v[x+D]=R,v[x+1+D]=M),c&&(v[x]=R,v[x+1]=M),x+=2),(o.normal||o.tangent||o.bitangent||n)&&(S=T+1,B=T+2,u?(L+3<l&&(k=j.Cartesian3.fromArray(s,L+3,ae),G&&(z=j.Cartesian3.fromArray(s,L+l,oe),h&&function(e,t,r,a){var o=a.cartesianToCartographic(e,J).height,i=a.cartesianToCartographic(t,X);i.height=o,a.cartographicToCartesian(i,t);var n=a.cartesianToCartographic(r,X);n.height=o-100,a.cartographicToCartesian(n,r)}(W,k,z,g),j.Cartesian3.subtract(k,W,k),j.Cartesian3.subtract(z,W,z),I=j.Cartesian3.normalize(j.Cartesian3.cross(z,k,I),I),G=!1),j.Cartesian3.equalsEpsilon(k,W,U.CesiumMath.EPSILON10)&&(G=!0)),(o.tangent||o.bitangent)&&(E=g.geodeticSurfaceNormal(W,E),o.tangent&&(A=j.Cartesian3.normalize(j.Cartesian3.cross(E,I,A),A)))):(I=g.geodeticSurfaceNormal(W,I),(o.tangent||o.bitangent)&&(h&&(ie=j.Cartesian3.fromArray(b,T,ie),ne=j.Cartesian3.cross(j.Cartesian3.UNIT_Z,ie,ne),ne=j.Cartesian3.normalize(Q.Matrix3.multiplyByVector(V,ne,ne),ne),o.bitangent&&(se=j.Cartesian3.normalize(j.Cartesian3.cross(ie,ne,se),se))),A=j.Cartesian3.cross(j.Cartesian3.UNIT_Z,I,A),A=j.Cartesian3.normalize(Q.Matrix3.multiplyByVector(V,A,A),A),o.bitangent&&(E=j.Cartesian3.normalize(j.Cartesian3.cross(I,A,E),E)))),o.normal&&(e.wall?(b[T+F]=I.x,b[S+F]=I.y,b[B+F]=I.z):p&&(b[T+F]=-I.x,b[S+F]=-I.y,b[B+F]=-I.z),(c&&!h||u)&&(b[T]=I.x,b[S]=I.y,b[B]=I.z)),n&&(u&&(I=g.geodeticSurfaceNormal(W,I)),w[T+F]=-I.x,w[S+F]=-I.y,w[B+F]=-I.z),o.tangent&&(e.wall?(P[T+F]=A.x,P[S+F]=A.y,P[B+F]=A.z):p&&(P[T+F]=-A.x,P[S+F]=-A.y,P[B+F]=-A.z),c&&(h?(P[T]=ne.x,P[S]=ne.y,P[B]=ne.z):(P[T]=A.x,P[S]=A.y,P[B]=A.z))),o.bitangent&&(p&&(C[T+F]=E.x,C[S+F]=E.y,C[B+F]=E.z),c&&(h?(C[T]=se.x,C[S]=se.y,C[B]=se.z):(C[T]=E.x,C[S]=E.y,C[B]=E.z))),T+=3)}o.st&&(i.attributes.st=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:v})),o.normal&&(i.attributes.normal=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b})),o.tangent&&(i.attributes.tangent=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:P})),o.bitangent&&(i.attributes.bitangent=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:C})),n&&(i.attributes.extrudeDirection=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w}))}return e.extrude&&Y.defined(e.offsetAttribute)&&(t=s.length/3,a=new Uint8Array(t),e.offsetAttribute===Z.GeometryOffsetAttribute.TOP?c&&p||u?a=Z.arrayFill(a,1,0,t/2):c&&(a=Z.arrayFill(a,1)):(r=e.offsetAttribute===Z.GeometryOffsetAttribute.NONE?0:1,a=Z.arrayFill(a,r)),i.attributes.applyOffset=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:a})),i}var m=new j.Cartographic,g=new j.Cartographic,d={westOverIDL:0,eastOverIDL:0},h=new y.EllipsoidGeodesic;function f(e,t,r,a,o){if(o=Y.defaultValue(o,new j.Rectangle),!Y.defined(e)||e.length<3)return o.west=0,o.north=0,o.south=0,o.east=0,o;if(r===p.ArcType.RHUMB)return j.Rectangle.fromCartesianArray(e,t,o);h.ellipsoid.equals(t)||(h=new y.EllipsoidGeodesic(void 0,void 0,t)),o.west=Number.POSITIVE_INFINITY,o.east=Number.NEGATIVE_INFINITY,o.south=Number.POSITIVE_INFINITY,o.north=Number.NEGATIVE_INFINITY,d.westOverIDL=Number.POSITIVE_INFINITY,d.eastOverIDL=Number.NEGATIVE_INFINITY;for(var i,n=1/U.CesiumMath.chordLength(a,t.maximumRadius),s=e.length,l=t.cartesianToCartographic(e[0],g),u=m,c=1;c<s;c++)i=u,u=l,l=t.cartesianToCartographic(e[c],i),h.setEndPoints(u,l),_(h,n,o,d);return i=u,u=l,l=t.cartesianToCartographic(e[0],i),h.setEndPoints(u,l),_(h,n,o,d),o.east-o.west>d.eastOverIDL-d.westOverIDL&&(o.west=d.westOverIDL,o.east=d.eastOverIDL,o.east>U.CesiumMath.PI&&(o.east=o.east-U.CesiumMath.TWO_PI),o.west>U.CesiumMath.PI&&(o.west=o.west-U.CesiumMath.TWO_PI)),o}var v=new j.Cartographic;function _(e,t,r,a){for(var o=e.surfaceDistance,i=Math.ceil(o*t),n=0<i?o/(i-1):Number.POSITIVE_INFINITY,s=0,l=0;l<i;l++){var u=e.interpolateUsingSurfaceDistance(s,v);s+=n;var c=u.longitude,p=u.latitude;r.west=Math.min(r.west,c),r.east=Math.max(r.east,c),r.south=Math.min(r.south,p),r.north=Math.max(r.north,p);var y=0<=c?c:c+U.CesiumMath.TWO_PI;a.westOverIDL=Math.min(a.westOverIDL,y),a.eastOverIDL=Math.max(a.eastOverIDL,y)}}var k=[];function P(e){var t,r=e.polygonHierarchy,a=Y.defaultValue(e.vertexFormat,b.VertexFormat.DEFAULT),o=Y.defaultValue(e.ellipsoid,j.Ellipsoid.WGS84),i=Y.defaultValue(e.granularity,U.CesiumMath.RADIANS_PER_DEGREE),n=Y.defaultValue(e.stRotation,0),s=Y.defaultValue(e.perPositionHeight,!1),l=s&&Y.defined(e.extrudedHeight),u=Y.defaultValue(e.height,0),c=Y.defaultValue(e.extrudedHeight,u);l||(t=Math.max(u,c),c=Math.min(u,c),u=t),this._vertexFormat=b.VertexFormat.clone(a),this._ellipsoid=j.Ellipsoid.clone(o),this._granularity=i,this._stRotation=n,this._height=u,this._extrudedHeight=c,this._closeTop=Y.defaultValue(e.closeTop,!0),this._closeBottom=Y.defaultValue(e.closeBottom,!0),this._polygonHierarchy=r,this._perPositionHeight=s,this._perPositionHeightExtrude=l,this._shadowVolume=Y.defaultValue(e.shadowVolume,!1),this._workerName="createPolygonGeometry",this._offsetAttribute=e.offsetAttribute,this._arcType=Y.defaultValue(e.arcType,p.ArcType.GEODESIC),this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0,this.packedLength=M.PolygonGeometryLibrary.computeHierarchyPackedLength(r)+j.Ellipsoid.packedLength+b.VertexFormat.packedLength+12}P.fromPositions=function(e){return new P({polygonHierarchy:{positions:(e=Y.defaultValue(e,Y.defaultValue.EMPTY_OBJECT)).positions},height:e.height,extrudedHeight:e.extrudedHeight,vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,closeTop:e.closeTop,closeBottom:e.closeBottom,offsetAttribute:e.offsetAttribute,arcType:e.arcType})},P.pack=function(e,t,r){return r=Y.defaultValue(r,0),r=M.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r),j.Ellipsoid.pack(e._ellipsoid,t,r),r+=j.Ellipsoid.packedLength,b.VertexFormat.pack(e._vertexFormat,t,r),r+=b.VertexFormat.packedLength,t[r++]=e._height,t[r++]=e._extrudedHeight,t[r++]=e._granularity,t[r++]=e._stRotation,t[r++]=e._perPositionHeightExtrude?1:0,t[r++]=e._perPositionHeight?1:0,t[r++]=e._closeTop?1:0,t[r++]=e._closeBottom?1:0,t[r++]=e._shadowVolume?1:0,t[r++]=Y.defaultValue(e._offsetAttribute,-1),t[r++]=e._arcType,t[r]=e.packedLength,t};var C=j.Ellipsoid.clone(j.Ellipsoid.UNIT_SPHERE),w=new b.VertexFormat,x={polygonHierarchy:{}};return P.unpack=function(e,t,r){t=Y.defaultValue(t,0);var a=M.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=a.startingIndex,delete a.startingIndex;var o=j.Ellipsoid.unpack(e,t,C);t+=j.Ellipsoid.packedLength;var i=b.VertexFormat.unpack(e,t,w);t+=b.VertexFormat.packedLength;var n=e[t++],s=e[t++],l=e[t++],u=e[t++],c=1===e[t++],p=1===e[t++],y=1===e[t++],m=1===e[t++],g=1===e[t++],d=e[t++],h=e[t++],f=e[t];return Y.defined(r)||(r=new P(x)),r._polygonHierarchy=a,r._ellipsoid=j.Ellipsoid.clone(o,r._ellipsoid),r._vertexFormat=b.VertexFormat.clone(i,r._vertexFormat),r._height=n,r._extrudedHeight=s,r._granularity=l,r._stRotation=u,r._perPositionHeightExtrude=c,r._perPositionHeight=p,r._closeTop=y,r._closeBottom=m,r._shadowVolume=g,r._offsetAttribute=-1===d?void 0:d,r._arcType=h,r.packedLength=f,r},P.computeRectangle=function(e,t){var r=Y.defaultValue(e.granularity,U.CesiumMath.RADIANS_PER_DEGREE),a=Y.defaultValue(e.arcType,p.ArcType.GEODESIC),o=e.polygonHierarchy,i=Y.defaultValue(e.ellipsoid,j.Ellipsoid.WGS84);return f(o.positions,i,a,r,t)},P.createGeometry=function(e){var t=e._vertexFormat,r=e._ellipsoid,a=e._granularity,o=e._stRotation,i=e._polygonHierarchy,n=e._perPositionHeight,s=e._closeTop,l=e._closeBottom,u=e._arcType,c=i.positions;if(!(c.length<3)){var p=H.EllipsoidTangentPlane.fromPoints(c,r),y=M.PolygonGeometryLibrary.polygonsFromHierarchy(i,p.projectPointsOntoPlane.bind(p),!n,r),m=y.hierarchy,g=y.polygons;if(0!==m.length){c=m[0].outerRing;var d,h=M.PolygonGeometryLibrary.computeBoundingRectangle(p.plane.normal,p.projectPointOntoPlane.bind(p),c,o,S),f=[],b=e._height,v=e._extrudedHeight,_={perPositionHeight:n,vertexFormat:t,geometry:void 0,tangentPlane:p,boundingRectangle:h,ellipsoid:r,stRotation:o,bottom:!1,top:!0,wall:!1,extrude:!1,arcType:u};if(e._perPositionHeightExtrude||!U.CesiumMath.equalsEpsilon(b,v,0,U.CesiumMath.EPSILON2))for(_.extrude=!0,_.top=s,_.bottom=l,_.shadowVolume=e._shadowVolume,_.offsetAttribute=e._offsetAttribute,d=0;d<g.length;d++){var P,C=function(e,t,r,a,o,i,n,s,l){var u={walls:[]};if(i||n){var c=M.PolygonGeometryLibrary.createGeometryFromPositions(e,t,r,o,s,l),p=c.attributes.position.values,y=c.indices;if(i&&n){var m,g=p.concat(p),d=g.length/3;(m=L.IndexDatatype.createTypedArray(d,2*y.length)).set(y);for(var h,f=y.length,b=d/2,v=0;v<f;v+=3){var _=m[v]+b,P=m[v+1]+b,C=m[v+2]+b;m[v+f]=C,m[v+1+f]=P,m[v+2+f]=_}c.attributes.position.values=g,o&&s.normal&&(h=c.attributes.normal.values,c.attributes.normal.values=new Float32Array(g.length),c.attributes.normal.values.set(h)),c.indices=m}else if(n){for(d=p.length/3,m=L.IndexDatatype.createTypedArray(d,y.length),v=0;v<y.length;v+=3)m[v]=y[v+2],m[v+1]=y[v+1],m[v+2]=y[v];c.indices=m}u.topAndBottom=new N.GeometryInstance({geometry:c})}var w=a.outerRing,x=H.EllipsoidTangentPlane.fromPoints(w,e).projectPointsOntoPlane(w,k);R.PolygonPipeline.computeWindingOrder2D(x)===R.WindingOrder.CLOCKWISE&&(w=w.slice().reverse());var T=M.PolygonGeometryLibrary.computeWallGeometry(w,e,r,o,l);u.walls.push(new N.GeometryInstance({geometry:T}));var I=a.holes;for(v=0;v<I.length;v++){var A=I[v],x=H.EllipsoidTangentPlane.fromPoints(A,e).projectPointsOntoPlane(A,k);R.PolygonPipeline.computeWindingOrder2D(x)===R.WindingOrder.COUNTER_CLOCKWISE&&(A=A.slice().reverse()),T=M.PolygonGeometryLibrary.computeWallGeometry(A,e,r,o,l),u.walls.push(new N.GeometryInstance({geometry:T}))}return u}(r,g[d],a,m[d],n,s,l,t,u);s&&l?(P=C.topAndBottom,_.geometry=M.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(P.geometry,b,v,r,n)):s?((P=C.topAndBottom).geometry.attributes.position.values=R.PolygonPipeline.scaleToGeodeticHeight(P.geometry.attributes.position.values,b,r,!n),_.geometry=P.geometry):l&&((P=C.topAndBottom).geometry.attributes.position.values=R.PolygonPipeline.scaleToGeodeticHeight(P.geometry.attributes.position.values,v,r,!0),_.geometry=P.geometry),(s||l)&&(_.wall=!1,P.geometry=B(_),f.push(P));var w=C.walls;_.wall=!0;for(var x=0;x<w.length;x++){var T=w[x];_.geometry=M.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(T.geometry,b,v,r,n),T.geometry=B(_),f.push(T)}}else for(d=0;d<g.length;d++){var I,A,E,G=new N.GeometryInstance({geometry:M.PolygonGeometryLibrary.createGeometryFromPositions(r,g[d],a,n,t,u)});G.geometry.attributes.position.values=R.PolygonPipeline.scaleToGeodeticHeight(G.geometry.attributes.position.values,b,r,!n),_.geometry=G.geometry,G.geometry=B(_),Y.defined(e._offsetAttribute)&&(I=G.geometry.attributes.position.values.length,A=new Uint8Array(I/3),E=e._offsetAttribute===Z.GeometryOffsetAttribute.NONE?0:1,Z.arrayFill(A,E),G.geometry.attributes.applyOffset=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:A})),f.push(G)}var O=D.GeometryPipeline.combineInstances(f)[0];O.attributes.position.values=new Float64Array(O.attributes.position.values),O.indices=L.IndexDatatype.createTypedArray(O.attributes.position.values.length/3,O.indices);var V=O.attributes,F=Q.BoundingSphere.fromVertices(V.position.values);return t.position||delete V.position,new K.Geometry({attributes:V,indices:O.indices,primitiveType:O.primitiveType,boundingSphere:F,offsetAttribute:e._offsetAttribute})}}},P.createShadowVolume=function(e,t,r){var a=e._granularity,o=e._ellipsoid,i=t(a,o),n=r(a,o);return new P({polygonHierarchy:e._polygonHierarchy,ellipsoid:o,stRotation:e._stRotation,granularity:a,perPositionHeight:!1,extrudedHeight:i,height:n,vertexFormat:b.VertexFormat.POSITION_ONLY,shadowVolume:!0,arcType:e._arcType})},Object.defineProperties(P.prototype,{rectangle:{get:function(){var e;return Y.defined(this._rectangle)||(e=this._polygonHierarchy.positions,this._rectangle=f(e,this._ellipsoid,this._arcType,this._granularity)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return Y.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(e){var t=-e._stRotation;if(0==t)return[0,0,0,1,1,0];var r=e._ellipsoid,a=e._polygonHierarchy.positions,o=e.rectangle;return K.Geometry._textureCoordinateRotationPoints(a,t,r,o)}(this)),this._textureCoordinateRotationPoints}}}),function(e,t){return Y.defined(t)&&(e=P.unpack(e,t)),e._ellipsoid=j.Ellipsoid.clone(e._ellipsoid),P.createGeometry(e)}});
