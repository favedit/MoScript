function cal_dot(x1, y1, z1, x2, y2, z2) {
    return (x1*x2 + y1*y2 + z1*z2) / Math.sqrt(x1*x1+y1*y1+z1*z1) / Math.sqrt(x2*x2+y2*y2+z2*z2);
}

function cal_cross(x1, y1, z1, x2, y2, z2) {
    return x1*y2 - x2*y1;
}

function cal_angle(ind, points, m) {
    var points_num = points.length / 3;
    var i=ind, j=ind;
    do {
        i--;
        if (i < 0) {
            i = points_num - 1;
        }
    } while (m[i]);
    do {
        j++;
        if (j >= points_num) {
            j = 0;
        }
    } while (m[j]);
    
    return new Array(i, ind, j);
}

function cal_index(points) {
    var index = new Array();
    var points_num = points.length / 3;
    
    var i = -1;
    var m = new Array(points_num); //mark which points already moved
    var cos = new Array(points_num);
    while (++i < points_num - 3) {
        var a, b, c;
        var minj=-1, mina, minb, minc;
        for (var j=0; j<points_num; j++) {
            if (m[j]) {//already marked
                continue;
            }
            else {
                var arr = cal_angle(j, points, m);
                a = arr[0];
                b = arr[1];
                c = arr[2];
                
                cross = cal_cross(points[3*a]-points[3*b], points[3*a+1]-points[3*b+1], points[3*a+2]-points[3*b+2],
                    points[3*b]-points[3*c], points[3*b+1]-points[3*c+1], points[3*b+2]-points[3*c+2]);
                if (cross < 0) {
                    continue;
                }
                
                cos[j] = cal_dot(points[3*a]-points[3*b], points[3*a+1]-points[3*b+1], points[3*a+2]-points[3*b+2],
                    points[3*c]-points[3*b], points[3*c+1]-points[3*b+1], points[3*c+2]-points[3*b+2]);
            }

            if (minj == -1 || cos[j] > cos[minj]) {
                minj = j;
                mina = arr[0];
                minb = arr[1];
                minc = arr[2];
            }
        }

        index.push(mina, minb, minc);
        m[minj] = 1;
    }
    for (i=0; i<points_num; i++) {
        if (!m[i]) {
            //console.log(i);
            //index.push(i);
        }
    }
    
    return index;
}