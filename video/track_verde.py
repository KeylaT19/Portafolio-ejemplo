# Sigue las 4 esquinas de la pantalla verde cuadro por cuadro.
import sys, json, subprocess, numpy as np
src, out = sys.argv[1], sys.argv[2]
W, H = 1920, 1080
p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
ys, xs = np.mgrid[0:H, 0:W]
res = []
while True:
    buf = p.stdout.read(W * H * 3)
    if len(buf) < W * H * 3:
        break
    a = np.frombuffer(buf, np.uint8).reshape(H, W, 3).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = (g > r + 50) & (g > b + 70) & (g > 120)
    if m.sum() < 1000:
        res.append(None); continue
    X, Y = xs[m], ys[m]
    s, d = X + Y, X - Y
    tl = (int(X[s.argmin()]), int(Y[s.argmin()]))
    br = (int(X[s.argmax()]), int(Y[s.argmax()]))
    tr = (int(X[d.argmax()]), int(Y[d.argmax()]))
    bl = (int(X[d.argmin()]), int(Y[d.argmin()]))
    res.append([tl, tr, br, bl])
json.dump(res, open(out, 'w'))
print(len(res), res[0], res[len(res)//2], res[-1])
