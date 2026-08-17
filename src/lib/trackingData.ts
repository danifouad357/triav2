// trackingData.ts
// Format: [top-left, top-right, bottom-right, bottom-left] as [x, y] tuples.
// This is a dense array (every 5th frame) pre-inflated by 25px to guarantee overlap.

export type TrackingKeyframe = {
  frame: number;
  corners: [[number, number], [number, number], [number, number], [number, number]];
};

export const trackingData: TrackingKeyframe[] = [
  {
    "frame": 1,
    "corners": [
      [
        1156,
        307
      ],
      [
        1666,
        258
      ],
      [
        1618,
        713
      ],
      [
        1113,
        675
      ]
    ]
  },
  {
    "frame": 6,
    "corners": [
      [
        1155,
        307
      ],
      [
        1665,
        257
      ],
      [
        1618,
        712
      ],
      [
        1113,
        677
      ]
    ]
  },
  {
    "frame": 11,
    "corners": [
      [
        1153,
        306
      ],
      [
        1664,
        257
      ],
      [
        1616,
        714
      ],
      [
        1109,
        675
      ]
    ]
  },
  {
    "frame": 16,
    "corners": [
      [
        1150,
        305
      ],
      [
        1661,
        255
      ],
      [
        1613,
        715
      ],
      [
        1107,
        677
      ]
    ]
  },
  {
    "frame": 21,
    "corners": [
      [
        1145,
        305
      ],
      [
        1658,
        253
      ],
      [
        1609,
        717
      ],
      [
        1103,
        679
      ]
    ]
  },
  {
    "frame": 26,
    "corners": [
      [
        1140,
        304
      ],
      [
        1655,
        252
      ],
      [
        1607,
        717
      ],
      [
        1097,
        679
      ]
    ]
  },
  {
    "frame": 31,
    "corners": [
      [
        1134,
        303
      ],
      [
        1652,
        250
      ],
      [
        1603,
        719
      ],
      [
        1091,
        680
      ]
    ]
  },
  {
    "frame": 36,
    "corners": [
      [
        1129,
        300
      ],
      [
        1648,
        249
      ],
      [
        1597,
        721
      ],
      [
        1084,
        681
      ]
    ]
  },
  {
    "frame": 41,
    "corners": [
      [
        1121,
        299
      ],
      [
        1643,
        246
      ],
      [
        1593,
        723
      ],
      [
        1076,
        682
      ]
    ]
  },
  {
    "frame": 46,
    "corners": [
      [
        1111,
        299
      ],
      [
        1638,
        244
      ],
      [
        1587,
        726
      ],
      [
        1067,
        685
      ]
    ]
  },
  {
    "frame": 51,
    "corners": [
      [
        1102,
        296
      ],
      [
        1633,
        242
      ],
      [
        1581,
        729
      ],
      [
        1057,
        687
      ]
    ]
  },
  {
    "frame": 56,
    "corners": [
      [
        1092,
        294
      ],
      [
        1627,
        239
      ],
      [
        1576,
        731
      ],
      [
        1045,
        689
      ]
    ]
  },
  {
    "frame": 61,
    "corners": [
      [
        1079,
        294
      ],
      [
        1621,
        236
      ],
      [
        1570,
        735
      ],
      [
        1034,
        691
      ]
    ]
  },
  {
    "frame": 66,
    "corners": [
      [
        1066,
        292
      ],
      [
        1616,
        234
      ],
      [
        1565,
        737
      ],
      [
        1021,
        695
      ]
    ]
  },
  {
    "frame": 71,
    "corners": [
      [
        1052,
        290
      ],
      [
        1610,
        230
      ],
      [
        1557,
        743
      ],
      [
        1005,
        696
      ]
    ]
  },
  {
    "frame": 76,
    "corners": [
      [
        1036,
        287
      ],
      [
        1604,
        228
      ],
      [
        1555,
        745
      ],
      [
        990,
        699
      ]
    ]
  },
  {
    "frame": 81,
    "corners": [
      [
        1018,
        287
      ],
      [
        1598,
        224
      ],
      [
        1548,
        749
      ],
      [
        974,
        703
      ]
    ]
  },
  {
    "frame": 86,
    "corners": [
      [
        1001,
        283
      ],
      [
        1593,
        222
      ],
      [
        1543,
        752
      ],
      [
        956,
        707
      ]
    ]
  },
  {
    "frame": 91,
    "corners": [
      [
        982,
        281
      ],
      [
        1587,
        218
      ],
      [
        1539,
        756
      ],
      [
        937,
        711
      ]
    ]
  },
  {
    "frame": 96,
    "corners": [
      [
        961,
        279
      ],
      [
        1583,
        216
      ],
      [
        1536,
        760
      ],
      [
        917,
        715
      ]
    ]
  },
  {
    "frame": 101,
    "corners": [
      [
        941,
        275
      ],
      [
        1578,
        214
      ],
      [
        1532,
        766
      ],
      [
        896,
        720
      ]
    ]
  },
  {
    "frame": 106,
    "corners": [
      [
        916,
        273
      ],
      [
        1574,
        212
      ],
      [
        1530,
        770
      ],
      [
        873,
        724
      ]
    ]
  },
  {
    "frame": 111,
    "corners": [
      [
        892,
        270
      ],
      [
        1570,
        208
      ],
      [
        1530,
        773
      ],
      [
        851,
        730
      ]
    ]
  },
  {
    "frame": 116,
    "corners": [
      [
        868,
        266
      ],
      [
        1567,
        208
      ],
      [
        1530,
        777
      ],
      [
        827,
        737
      ]
    ]
  },
  {
    "frame": 121,
    "corners": [
      [
        839,
        262
      ],
      [
        1563,
        205
      ],
      [
        1529,
        783
      ],
      [
        801,
        742
      ]
    ]
  },
  {
    "frame": 126,
    "corners": [
      [
        811,
        258
      ],
      [
        1561,
        203
      ],
      [
        1529,
        789
      ],
      [
        776,
        749
      ]
    ]
  },
  {
    "frame": 131,
    "corners": [
      [
        784,
        253
      ],
      [
        1557,
        201
      ],
      [
        1531,
        793
      ],
      [
        750,
        757
      ]
    ]
  },
  {
    "frame": 136,
    "corners": [
      [
        755,
        250
      ],
      [
        1555,
        198
      ],
      [
        1531,
        800
      ],
      [
        724,
        765
      ]
    ]
  },
  {
    "frame": 141,
    "corners": [
      [
        725,
        244
      ],
      [
        1553,
        197
      ],
      [
        1533,
        806
      ],
      [
        697,
        773
      ]
    ]
  },
  {
    "frame": 146,
    "corners": [
      [
        699,
        238
      ],
      [
        1551,
        195
      ],
      [
        1535,
        812
      ],
      [
        671,
        782
      ]
    ]
  },
  {
    "frame": 151,
    "corners": [
      [
        669,
        234
      ],
      [
        1547,
        192
      ],
      [
        1535,
        819
      ],
      [
        645,
        792
      ]
    ]
  },
  {
    "frame": 156,
    "corners": [
      [
        641,
        228
      ],
      [
        1545,
        190
      ],
      [
        1539,
        825
      ],
      [
        617,
        800
      ]
    ]
  },
  {
    "frame": 161,
    "corners": [
      [
        611,
        220
      ],
      [
        1544,
        187
      ],
      [
        1539,
        834
      ],
      [
        591,
        812
      ]
    ]
  },
  {
    "frame": 166,
    "corners": [
      [
        584,
        213
      ],
      [
        1543,
        185
      ],
      [
        1541,
        841
      ],
      [
        563,
        822
      ]
    ]
  },
  {
    "frame": 171,
    "corners": [
      [
        554,
        206
      ],
      [
        1541,
        182
      ],
      [
        1541,
        850
      ],
      [
        535,
        834
      ]
    ]
  },
  {
    "frame": 176,
    "corners": [
      [
        525,
        198
      ],
      [
        1540,
        178
      ],
      [
        1542,
        858
      ],
      [
        509,
        846
      ]
    ]
  },
  {
    "frame": 181,
    "corners": [
      [
        496,
        191
      ],
      [
        1540,
        177
      ],
      [
        1544,
        866
      ],
      [
        481,
        857
      ]
    ]
  },
  {
    "frame": 186,
    "corners": [
      [
        470,
        182
      ],
      [
        1539,
        172
      ],
      [
        1545,
        875
      ],
      [
        455,
        868
      ]
    ]
  },
  {
    "frame": 191,
    "corners": [
      [
        445,
        174
      ],
      [
        1540,
        168
      ],
      [
        1546,
        885
      ],
      [
        431,
        879
      ]
    ]
  },
  {
    "frame": 196,
    "corners": [
      [
        423,
        166
      ],
      [
        1542,
        164
      ],
      [
        1550,
        892
      ],
      [
        409,
        890
      ]
    ]
  },
  {
    "frame": 201,
    "corners": [
      [
        405,
        160
      ],
      [
        1547,
        160
      ],
      [
        1558,
        900
      ],
      [
        392,
        900
      ]
    ]
  },
  {
    "frame": 206,
    "corners": [
      [
        389,
        155
      ],
      [
        1554,
        154
      ],
      [
        1565,
        908
      ],
      [
        377,
        909
      ]
    ]
  },
  {
    "frame": 211,
    "corners": [
      [
        375,
        150
      ],
      [
        1562,
        151
      ],
      [
        1572,
        917
      ],
      [
        363,
        917
      ]
    ]
  },
  {
    "frame": 216,
    "corners": [
      [
        363,
        146
      ],
      [
        1567,
        146
      ],
      [
        1578,
        924
      ],
      [
        351,
        924
      ]
    ]
  },
  {
    "frame": 221,
    "corners": [
      [
        353,
        143
      ],
      [
        1572,
        142
      ],
      [
        1584,
        930
      ],
      [
        341,
        931
      ]
    ]
  },
  {
    "frame": 226,
    "corners": [
      [
        345,
        140
      ],
      [
        1577,
        139
      ],
      [
        1590,
        934
      ],
      [
        333,
        936
      ]
    ]
  },
  {
    "frame": 231,
    "corners": [
      [
        337,
        138
      ],
      [
        1581,
        137
      ],
      [
        1596,
        937
      ],
      [
        325,
        939
      ]
    ]
  },
  {
    "frame": 236,
    "corners": [
      [
        333,
        139
      ],
      [
        1584,
        137
      ],
      [
        1598,
        938
      ],
      [
        322,
        940
      ]
    ]
  },
  {
    "frame": 241,
    "corners": [
      [
        333,
        139
      ],
      [
        1586,
        139
      ],
      [
        1598,
        938
      ],
      [
        321,
        939
      ]
    ]
  },
  {
    "frame": 246,
    "corners": [
      [
        333,
        139
      ],
      [
        1586,
        139
      ],
      [
        1598,
        938
      ],
      [
        321,
        939
      ]
    ]
  },
  {
    "frame": 248,
    "corners": [
      [
        333,
        139
      ],
      [
        1586,
        139
      ],
      [
        1598,
        938
      ],
      [
        321,
        939
      ]
    ]
  }
];

function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t2 * t;
  return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
}

export function getInterpolatedCorners(targetFrame: number): [[number, number], [number, number], [number, number], [number, number]] {
  const len = trackingData.length;
  if (targetFrame <= trackingData[0].frame) return trackingData[0].corners;
  if (targetFrame >= trackingData[len - 1].frame) return trackingData[len - 1].corners;

  let idx = 0;
  for (let i = 0; i < len - 1; i++) {
    if (targetFrame >= trackingData[i].frame && targetFrame <= trackingData[i + 1].frame) {
      idx = i;
      break;
    }
  }

  const kf0 = trackingData[Math.max(0, idx - 1)];
  const kf1 = trackingData[idx];
  const kf2 = trackingData[idx + 1];
  const kf3 = trackingData[Math.min(len - 1, idx + 2)];

  const range = kf2.frame - kf1.frame;
  const t = range > 0 ? (targetFrame - kf1.frame) / range : 0;

  const result: any = [];
  for (let i = 0; i < 4; i++) {
    const x = catmullRom(kf0.corners[i][0], kf1.corners[i][0], kf2.corners[i][0], kf3.corners[i][0], t);
    const y = catmullRom(kf0.corners[i][1], kf1.corners[i][1], kf2.corners[i][1], kf3.corners[i][1], t);
    result.push([x, y]);
  }

  return result as [[number, number], [number, number], [number, number], [number, number]];
}
