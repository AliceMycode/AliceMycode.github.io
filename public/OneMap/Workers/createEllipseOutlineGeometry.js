define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-a8ce88a9","./Transforms-e3538a05","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-8143c9e5","./GeometryAttributes-4fcfcf40","./IndexDatatype-53503fee","./GeometryOffsetAttribute-7350d9af","./EllipseGeometryLibrary-8df03b68","./EllipseOutlineGeometry-828b8f6e"],function(r,e,t,n,i,c,a,o,l,s,f,u,d,m){"use strict";return function(e,t){return r.defined(t)&&(e=m.EllipseOutlineGeometry.unpack(e,t)),e._center=n.Cartesian3.clone(e._center),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),m.EllipseOutlineGeometry.createGeometry(e)}});
