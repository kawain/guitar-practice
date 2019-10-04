module.exports = class Volume {
    constructor(synth = undefined, hiHat = undefined) {
        //読み込み
        const Config = require('electron-config');
        this.config = new Config();

        //音量
        this.volume = document.getElementById("volume");
        this.voluneValue = document.getElementById("volumeValue");

        //config.get('volume')　から取得、または保存
        this.defaultVolume = -10;
        if (this.config.get('volume')) {
            this.defaultVolume = this.config.get('volume');
        } else {
            this.config.set('volume', this.defaultVolume);
        }

        //
        this.synth = synth;
        this.hiHat = hiHat;

        if (typeof this.synth !== "undefined") {
            this.synth.volume.value = this.defaultVolume;
        }

        if (typeof this.hiHat !== "undefined") {
            //MetalSynth は音がうるさいのでもっと小さくする
            this.hiHat.volume.value = this.defaultVolume - 10;
        }

        this.volume.value = this.defaultVolume;
        this.voluneValue.innerHTML = this.defaultVolume;

        //イベント
        volume.addEventListener("change", () => {
            if (typeof this.synth !== "undefined") {
                this.synth.volume.value = this.volume.value;
            }

            if (typeof this.hiHat !== "undefined") {
                //MetalSynth は音がうるさいのでもっと小さくする
                this.hiHat.volume.value = this.volume.value - 10;
            }

            this.voluneValue.innerHTML = this.volume.value;
            this.config.set('volume', this.volume.value);
        });
    }
}