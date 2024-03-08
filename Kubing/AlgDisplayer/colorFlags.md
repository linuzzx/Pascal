Cube Coloring
-------------

**Flags**
[piece]		    specific piece
[piece + _]		face of specific piece
all/a		    all pieces
centers		    all centers
edges		    all edges
corners		    all corners
slice_m		    pieces of m slice
slice_e		    pieces of e slice
slice_s		    pieces of s slice
face_u		    u face
face_d		    d face
face_f		    f face
face_b		    b face
face_r		    r face
face_l		    l face
layer_u		    pieces of u layer
layer_d		    pieces of d layer
layer_f		    pieces of f layer
layer_b		    pieces of b layer
layer_r		    pieces of r layer
layer_l		    pieces of l layer
eo/eo_f/eo_b	faces of fb eo pieces
eo_r/eo_l		faces of fb eo pieces
eo_u/eo_d		faces of ud eo pieces
eoline          eoline
cross		    cross pieces
f2l		        all f2l pairs
f2l_b		    f2l pairs on b face
f2l_r		    f2l pairs on r face
f2l_l		    f2l pairs on l face
f2l_f		    f2l pairs on f face
f2l_fl		    fl f2l pair
f2l_fr		    fr f2l pair
f2l_bl		    bl f2l pair
f2l_br		    br f2l pair
oll		        faces of oll pieces
pll		        faces of last layer pieces without oll face
ll		        pieces of last layer
ell		        edges of last layer
cll		        corners of last layer
dr/dr_u/dr_d	faces of ud dr layers
dr_f/dr_b	    faces of fb dr layers
dr_r/dr_l	    faces of rl dr layers
fb		        1x2x3 on left side
sb		        1x2x3 on right side
lse/l6e		    ub,ur,uf,ul,df,db pieces

**Colors**
clean		default cube colors (white,yellow,green,blue,red,orange) on chosen set of pieces
hex colors	#00aaff, #000, #fff
html colors	Black, HotPink, Lime (https://www.w3schools.com/tags/ref_colornames.asp)

**Explanation**
[piece]:
(First letter matter)
Corners -> ufr/urf, rdb/rbd
Edges -> uf, rd
Centers -> u, f
piece + _ -> only the face of the selected piece will be displayed

**Usage**
To use a flag, use a dash (-) in front of it, then type a following color
-Cube will be colored in flag order
-If a flag has no following color, it will will use default colors

**Examples**
Example 1: -ll black -> last layer will be black, rest of cube is clean
Example 2: -all #000 -f2l #555 -f2l_fr clean -> all pieces is colored black, then all f2l pieces is colored gray, then fr f2l pair will be colored clean
Example 3: -all -> cube is just clean, nothing changes
Example 4: -slice_e black -all red -> second flag overwrites the first and the whole cube will be colored red
Example 5: -all black -cross -centers -> all pieces but centers and cross edges are black