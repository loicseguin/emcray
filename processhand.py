import matplotlib.pyplot as plt
import numpy as np

hand = plt.imread("./images/hand-xray.jpeg")
mask = plt.imread("./images/hand-xray-tissu-mask.jpg")
fracture = (mask > 225) & (mask < 235)
bone = mask >= 235
soft = (mask <= 225) & (mask > 30)

tissues = np.zeros_like(hand)
tissues[soft] = 1
tissues[fracture] = 2
tissues[bone] = 3

# np.savetxt('hand-tissues.dat', tissues, fmt='%d')
with open('hand-data.js', 'w') as f:
    f.write('tissues = [\n')
    for row in tissues:
        f.write('[')
        for col in row:
            f.write('%d, ' % col)
        f.write('],\n')
    f.write(']\n')


musoft = 19.32
mubone = 42.8
attenuations = np.zeros_like(hand)
attenuations[bone] = mubone
attenuations[soft] = musoft
attenuations[fracture] = mubone
hand = np.array(hand, dtype=int)
L = hand / (255/3) / attenuations
L[attenuations==0] = 0
L[soft] /= 1.5
# np.savetxt('hand-thickness.dat', L, fmt='%.5f')
with open('hand-data.js', 'a') as f:
    f.write('thickness = [\n')
    for row in L:
        f.write('[')
        for col in row:
            f.write('%.5f, ' % col)
        f.write('],\n')
    f.write(']\n')
# plt.imshow(L)
# plt.colorbar()
# plt.show()

