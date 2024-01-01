function getDefaultExportFromCjs(De) {
    return De && De.__esModule && Object.prototype.hasOwnProperty.call(De, "default") ? De.default : De
}
var md5$1 = {
    exports: {}
}
  , crypt = {
    exports: {}
};
(function() {
    var De = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
      , Ae = {
        rotl: function(lt, st) {
            return lt << st | lt >>> 32 - st
        },
        rotr: function(lt, st) {
            return lt << 32 - st | lt >>> st
        },
        endian: function(lt) {
            if (lt.constructor == Number)
                return Ae.rotl(lt, 8) & 16711935 | Ae.rotl(lt, 24) & 4278255360;
            for (var st = 0; st < lt.length; st++)
                lt[st] = Ae.endian(lt[st]);
            return lt
        },
        randomBytes: function(lt) {
            for (var st = []; lt > 0; lt--)
                st.push(Math.floor(Math.random() * 256));
            return st
        },
        bytesToWords: function(lt) {
            for (var st = [], ct = 0, Vt = 0; ct < lt.length; ct++,
            Vt += 8)
                st[Vt >>> 5] |= lt[ct] << 24 - Vt % 32;
            return st
        },
        wordsToBytes: function(lt) {
            for (var st = [], ct = 0; ct < lt.length * 32; ct += 8)
                st.push(lt[ct >>> 5] >>> 24 - ct % 32 & 255);
            return st
        },
        bytesToHex: function(lt) {
            for (var st = [], ct = 0; ct < lt.length; ct++)
                st.push((lt[ct] >>> 4).toString(16)),
                st.push((lt[ct] & 15).toString(16));
            return st.join("")
        },
        hexToBytes: function(lt) {
            for (var st = [], ct = 0; ct < lt.length; ct += 2)
                st.push(parseInt(lt.substr(ct, 2), 16));
            return st
        },
        bytesToBase64: function(lt) {
            for (var st = [], ct = 0; ct < lt.length; ct += 3)
                for (var Vt = lt[ct] << 16 | lt[ct + 1] << 8 | lt[ct + 2], ut = 0; ut < 4; ut++)
                    ct * 8 + ut * 6 <= lt.length * 8 ? st.push(De.charAt(Vt >>> 6 * (3 - ut) & 63)) : st.push("=");
            return st.join("")
        },
        base64ToBytes: function(lt) {
            lt = lt.replace(/[^A-Z0-9+\/]/ig, "");
            for (var st = [], ct = 0, Vt = 0; ct < lt.length; Vt = ++ct % 4)
                Vt != 0 && st.push((De.indexOf(lt.charAt(ct - 1)) & Math.pow(2, -2 * Vt + 8) - 1) << Vt * 2 | De.indexOf(lt.charAt(ct)) >>> 6 - Vt * 2);
            return st
        }
    };
    crypt.exports = Ae
}
)();
var cryptExports = crypt.exports
  , charenc = {
    utf8: {
        stringToBytes: function(De) {
            return charenc.bin.stringToBytes(unescape(encodeURIComponent(De)))
        },
        bytesToString: function(De) {
            return decodeURIComponent(escape(charenc.bin.bytesToString(De)))
        }
    },
    bin: {
        stringToBytes: function(De) {
            for (var Ae = [], lt = 0; lt < De.length; lt++)
                Ae.push(De.charCodeAt(lt) & 255);
            return Ae
        },
        bytesToString: function(De) {
            for (var Ae = [], lt = 0; lt < De.length; lt++)
                Ae.push(String.fromCharCode(De[lt]));
            return Ae.join("")
        }
    }
}
  , charenc_1 = charenc;
/*!
* Determine if an object is a Buffer
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
var isBuffer_1 = function(De) {
    return De != null && (isBuffer(De) || isSlowBuffer(De) || !!De._isBuffer)
};
function isBuffer(De) {
    return !!De.constructor && typeof De.constructor.isBuffer == "function" && De.constructor.isBuffer(De)
}
function isSlowBuffer(De) {
    return typeof De.readFloatLE == "function" && typeof De.slice == "function" && isBuffer(De.slice(0, 0))
}
(function() {
    var De = cryptExports
      , Ae = charenc_1.utf8
      , lt = isBuffer_1
      , st = charenc_1.bin
      , ct = function(Vt, ut) {
        Vt.constructor == String ? ut && ut.encoding === "binary" ? Vt = st.stringToBytes(Vt) : Vt = Ae.stringToBytes(Vt) : lt(Vt) ? Vt = Array.prototype.slice.call(Vt, 0) : !Array.isArray(Vt) && Vt.constructor !== Uint8Array && (Vt = Vt.toString());
        for (var Nt = De.bytesToWords(Vt), Zt = Vt.length * 8, Rt = 1732584193, Ut = -271733879, Wt = -1732584194, Ft = 271733878, kt = 0; kt < Nt.length; kt++)
            Nt[kt] = (Nt[kt] << 8 | Nt[kt] >>> 24) & 16711935 | (Nt[kt] << 24 | Nt[kt] >>> 8) & 4278255360;
        Nt[Zt >>> 5] |= 128 << Zt % 32,
        Nt[(Zt + 64 >>> 9 << 4) + 14] = Zt;
        for (var yt = ct._ff, St = ct._gg, wt = ct._hh, Et = ct._ii, kt = 0; kt < Nt.length; kt += 16) {
            var Jt = Rt
              , jt = Ut
              , Ot = Wt
              , Gt = Ft;
            Rt = yt(Rt, Ut, Wt, Ft, Nt[kt + 0], 7, -680876936),
            Ft = yt(Ft, Rt, Ut, Wt, Nt[kt + 1], 12, -389564586),
            Wt = yt(Wt, Ft, Rt, Ut, Nt[kt + 2], 17, 606105819),
            Ut = yt(Ut, Wt, Ft, Rt, Nt[kt + 3], 22, -1044525330),
            Rt = yt(Rt, Ut, Wt, Ft, Nt[kt + 4], 7, -176418897),
            Ft = yt(Ft, Rt, Ut, Wt, Nt[kt + 5], 12, 1200080426),
            Wt = yt(Wt, Ft, Rt, Ut, Nt[kt + 6], 17, -1473231341),
            Ut = yt(Ut, Wt, Ft, Rt, Nt[kt + 7], 22, -45705983),
            Rt = yt(Rt, Ut, Wt, Ft, Nt[kt + 8], 7, 1770035416),
            Ft = yt(Ft, Rt, Ut, Wt, Nt[kt + 9], 12, -1958414417),
            Wt = yt(Wt, Ft, Rt, Ut, Nt[kt + 10], 17, -42063),
            Ut = yt(Ut, Wt, Ft, Rt, Nt[kt + 11], 22, -1990404162),
            Rt = yt(Rt, Ut, Wt, Ft, Nt[kt + 12], 7, 1804603682),
            Ft = yt(Ft, Rt, Ut, Wt, Nt[kt + 13], 12, -40341101),
            Wt = yt(Wt, Ft, Rt, Ut, Nt[kt + 14], 17, -1502002290),
            Ut = yt(Ut, Wt, Ft, Rt, Nt[kt + 15], 22, 1236535329),
            Rt = St(Rt, Ut, Wt, Ft, Nt[kt + 1], 5, -165796510),
            Ft = St(Ft, Rt, Ut, Wt, Nt[kt + 6], 9, -1069501632),
            Wt = St(Wt, Ft, Rt, Ut, Nt[kt + 11], 14, 643717713),
            Ut = St(Ut, Wt, Ft, Rt, Nt[kt + 0], 20, -373897302),
            Rt = St(Rt, Ut, Wt, Ft, Nt[kt + 5], 5, -701558691),
            Ft = St(Ft, Rt, Ut, Wt, Nt[kt + 10], 9, 38016083),
            Wt = St(Wt, Ft, Rt, Ut, Nt[kt + 15], 14, -660478335),
            Ut = St(Ut, Wt, Ft, Rt, Nt[kt + 4], 20, -405537848),
            Rt = St(Rt, Ut, Wt, Ft, Nt[kt + 9], 5, 568446438),
            Ft = St(Ft, Rt, Ut, Wt, Nt[kt + 14], 9, -1019803690),
            Wt = St(Wt, Ft, Rt, Ut, Nt[kt + 3], 14, -187363961),
            Ut = St(Ut, Wt, Ft, Rt, Nt[kt + 8], 20, 1163531501),
            Rt = St(Rt, Ut, Wt, Ft, Nt[kt + 13], 5, -1444681467),
            Ft = St(Ft, Rt, Ut, Wt, Nt[kt + 2], 9, -51403784),
            Wt = St(Wt, Ft, Rt, Ut, Nt[kt + 7], 14, 1735328473),
            Ut = St(Ut, Wt, Ft, Rt, Nt[kt + 12], 20, -1926607734),
            Rt = wt(Rt, Ut, Wt, Ft, Nt[kt + 5], 4, -378558),
            Ft = wt(Ft, Rt, Ut, Wt, Nt[kt + 8], 11, -2022574463),
            Wt = wt(Wt, Ft, Rt, Ut, Nt[kt + 11], 16, 1839030562),
            Ut = wt(Ut, Wt, Ft, Rt, Nt[kt + 14], 23, -35309556),
            Rt = wt(Rt, Ut, Wt, Ft, Nt[kt + 1], 4, -1530992060),
            Ft = wt(Ft, Rt, Ut, Wt, Nt[kt + 4], 11, 1272893353),
            Wt = wt(Wt, Ft, Rt, Ut, Nt[kt + 7], 16, -155497632),
            Ut = wt(Ut, Wt, Ft, Rt, Nt[kt + 10], 23, -1094730640),
            Rt = wt(Rt, Ut, Wt, Ft, Nt[kt + 13], 4, 681279174),
            Ft = wt(Ft, Rt, Ut, Wt, Nt[kt + 0], 11, -358537222),
            Wt = wt(Wt, Ft, Rt, Ut, Nt[kt + 3], 16, -722521979),
            Ut = wt(Ut, Wt, Ft, Rt, Nt[kt + 6], 23, 76029189),
            Rt = wt(Rt, Ut, Wt, Ft, Nt[kt + 9], 4, -640364487),
            Ft = wt(Ft, Rt, Ut, Wt, Nt[kt + 12], 11, -421815835),
            Wt = wt(Wt, Ft, Rt, Ut, Nt[kt + 15], 16, 530742520),
            Ut = wt(Ut, Wt, Ft, Rt, Nt[kt + 2], 23, -995338651),
            Rt = Et(Rt, Ut, Wt, Ft, Nt[kt + 0], 6, -198630844),
            Ft = Et(Ft, Rt, Ut, Wt, Nt[kt + 7], 10, 1126891415),
            Wt = Et(Wt, Ft, Rt, Ut, Nt[kt + 14], 15, -1416354905),
            Ut = Et(Ut, Wt, Ft, Rt, Nt[kt + 5], 21, -57434055),
            Rt = Et(Rt, Ut, Wt, Ft, Nt[kt + 12], 6, 1700485571),
            Ft = Et(Ft, Rt, Ut, Wt, Nt[kt + 3], 10, -1894986606),
            Wt = Et(Wt, Ft, Rt, Ut, Nt[kt + 10], 15, -1051523),
            Ut = Et(Ut, Wt, Ft, Rt, Nt[kt + 1], 21, -2054922799),
            Rt = Et(Rt, Ut, Wt, Ft, Nt[kt + 8], 6, 1873313359),
            Ft = Et(Ft, Rt, Ut, Wt, Nt[kt + 15], 10, -30611744),
            Wt = Et(Wt, Ft, Rt, Ut, Nt[kt + 6], 15, -1560198380),
            Ut = Et(Ut, Wt, Ft, Rt, Nt[kt + 13], 21, 1309151649),
            Rt = Et(Rt, Ut, Wt, Ft, Nt[kt + 4], 6, -145523070),
            Ft = Et(Ft, Rt, Ut, Wt, Nt[kt + 11], 10, -1120210379),
            Wt = Et(Wt, Ft, Rt, Ut, Nt[kt + 2], 15, 718787259),
            Ut = Et(Ut, Wt, Ft, Rt, Nt[kt + 9], 21, -343485551),
            Rt = Rt + Jt >>> 0,
            Ut = Ut + jt >>> 0,
            Wt = Wt + Ot >>> 0,
            Ft = Ft + Gt >>> 0
        }
        return De.endian([Rt, Ut, Wt, Ft])
    };
    ct._ff = function(Vt, ut, Nt, Zt, Rt, Ut, Wt) {
        var Ft = Vt + (ut & Nt | ~ut & Zt) + (Rt >>> 0) + Wt;
        return (Ft << Ut | Ft >>> 32 - Ut) + ut
    }
    ,
    ct._gg = function(Vt, ut, Nt, Zt, Rt, Ut, Wt) {
        var Ft = Vt + (ut & Zt | Nt & ~Zt) + (Rt >>> 0) + Wt;
        return (Ft << Ut | Ft >>> 32 - Ut) + ut
    }
    ,
    ct._hh = function(Vt, ut, Nt, Zt, Rt, Ut, Wt) {
        var Ft = Vt + (ut ^ Nt ^ Zt) + (Rt >>> 0) + Wt;
        return (Ft << Ut | Ft >>> 32 - Ut) + ut
    }
    ,
    ct._ii = function(Vt, ut, Nt, Zt, Rt, Ut, Wt) {
        var Ft = Vt + (Nt ^ (ut | ~Zt)) + (Rt >>> 0) + Wt;
        return (Ft << Ut | Ft >>> 32 - Ut) + ut
    }
    ,
    ct._blocksize = 16,
    ct._digestsize = 16,
    md5$1.exports = function(Vt, ut) {
        if (Vt == null)
            throw new Error("Illegal argument " + Vt);
        var Nt = De.wordsToBytes(ct(Vt, ut));
        return ut && ut.asBytes ? Nt : ut && ut.asString ? st.bytesToString(Nt) : De.bytesToHex(Nt)
    }
}
)();
var md5Exports = md5$1.exports;
const md5 = getDefaultExportFromCjs(md5Exports)
  , formatString$1 = De=>{
    let Ae = "";
    for (let lt = 0; lt < De.length; lt++)
        Ae += String.fromCharCode(De.charCodeAt(lt) - 1);
    return Ae
}
  , LOCAL_STORAGE_KEY$1 = "wbi_img_urls";
function getPictureHashKey(De) {
    const Ae = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52]
      , lt = [];
    return Ae.forEach(st=>{
        De.charAt(st) && lt.push(De.charAt(st))
    }
    ),
    lt.join("").slice(0, 32)
}
function getLocal(De) {
    try {
        return localStorage.getItem(De)
    } catch (Ae) {
        return null
    }
}
function formatImgByLocalParams(De, Ae) {
    Ae || (Ae = {});
    const {imgKey: lt, subKey: st} = getImgFormatConfig(Ae);
    if (lt && st) {
        const ct = getPictureHashKey(lt + st)
          , Vt = Math.round(Date.now() / 1e3)
          , ut = Object.assign({}, De, {
            wts: Vt
        })
          , Nt = Object.keys(ut).sort()
          , Zt = []
          , Rt = /[!'()*]/g;
        for (let Ft = 0; Ft < Nt.length; Ft++) {
            const kt = Nt[Ft];
            let yt = ut[kt];
            yt && typeof yt == "string" && (yt = yt.replace(Rt, "")),
            yt != null && Zt.push(`${encodeURIComponent(kt)}=${encodeURIComponent(yt)}`)
        }
        const Ut = Zt.join("&");
        return {
            w_rid: md5(Ut + ct),
            wts: Vt.toString()
        }
    }
    return null
}
function getImgFormatConfig(De) {
    var ut;
    if (De.useAssignKey)
        return {
            imgKey: De.wbiImgKey,
            subKey: De.wbiSubKey
        };
    const Ae = ((ut = getLocal(LOCAL_STORAGE_KEY$1)) == null ? void 0 : ut.split("-")) || []
      , lt = Ae[0]
      , st = Ae[1]
      , ct = lt ? getKeyFromURL(lt) : De.wbiImgKey
      , Vt = st ? getKeyFromURL(st) : De.wbiSubKey;
    return {
        imgKey: ct,
        subKey: Vt
    }
}