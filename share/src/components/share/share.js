export default {
  data() {
    return {
      options: list,
      info: {
        name: '',
        phone: '',
        code: 86,
        email: '',
        sms_code: '',
      }
    }
  },
  methods: {
    call() {
      window.location.href = 'tel://17201213999'
    },
    async send_code() {
      console.log(' == ')

      if (!this.info.phone) {
        this.$message.error('请填写手机号')
        return
      }

      var num = this.info.code + this.info.phone + ''
      let res = await this.$post('sendSms', {
        phone: num
      })
      if (res.code == 200) {
        this.$message.success('Verification Code Was Sent Successfully')
      } else {
        this.$message.error('Verification Code Sent')
      }
    },
    async send() {

      // this.$router.push('Shareinfo')
      // return

      let flag = false

      for (var key in this.info) {
        console.log(key + '===' + this.info[key])
        if (this.info[key] != '0' && !this.info[key]) {
          flag = true
          break
        }
      }

      if (flag) {} else {
        let res = await this.$post('register', this.info)
        if (res.code == 200) {
          res.data.phone = this.info.phone
          this.$router.push({
            name: 'shareinfo',
            params: res.data
          })
          sessionStorage.setItem('CODEIMG', res.data.haibao);
        } else {
          this.$message.error(res.msg)
        }
      }

    },
    async check_account() {
      console.log('check_account')

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      let res = await this.$post('checkAccount', this.info)
      loading.close();

      if (res.code == 200) {
        this.info.name = res.data.name
        this.info.email = res.data.email
      }

    }
  },
  mounted: async function () {

  }
}

const list = [{
    "id": 584,
    "titleKey": "china.+86",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 6,
    "value": 86
  },
  {
    "id": 882,
    "titleKey": "united.states.of.america.+1",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 5,
    "value": 1
  },
  {
    "id": 768,
    "titleKey": "india.+91",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 4,
    "value": 91
  },
  {
    "id": 827,
    "titleKey": "pakistan.+92",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 3,
    "value": 92
  },
  {
    "id": 840,
    "titleKey": "russia.+7",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 2,
    "value": 7
  },
  {
    "id": 881,
    "titleKey": "united.kingdom.+44",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 1,
    "value": 44
  },
  {
    "id": 696,
    "titleKey": "afghanistan.+93",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 93
  },
  {
    "id": 697,
    "titleKey": "albania.+355",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 355
  },
  {
    "id": 698,
    "titleKey": "algeria.+213",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 213
  },
  {
    "id": 699,
    "titleKey": "andorra.+376",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 376
  },
  {
    "id": 695,
    "titleKey": "angola",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 244
  },
  {
    "id": 700,
    "titleKey": "anguilla.+1264",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1264
  },
  {
    "id": 701,
    "titleKey": "antigua.and.barbuda.+1268",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1268
  },
  {
    "id": 702,
    "titleKey": "argentina.+54",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 54
  },
  {
    "id": 703,
    "titleKey": "armenia.+374",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 374
  },
  {
    "id": 704,
    "titleKey": "ascension.+247",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 247
  },
  {
    "id": 705,
    "titleKey": "australia.+61",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 61
  },
  {
    "id": 706,
    "titleKey": "austria.+43",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 43
  },
  {
    "id": 707,
    "titleKey": "azerbaijan.+994",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 994
  },
  {
    "id": 708,
    "titleKey": "bahamas+1242",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1242
  },
  {
    "id": 709,
    "titleKey": "bahrain.+973",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 973
  },
  {
    "id": 710,
    "titleKey": "bangladesh.+880",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 880
  },
  {
    "id": 711,
    "titleKey": "barbados.+1246",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1246
  },
  {
    "id": 712,
    "titleKey": "belarus.+375",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 375
  },
  {
    "id": 713,
    "titleKey": "belgium+32",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 32
  },
  {
    "id": 714,
    "titleKey": "belize.+501",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 501
  },
  {
    "id": 715,
    "titleKey": "benin.+229",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 229
  },
  {
    "id": 716,
    "titleKey": "bermudais.+1441",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1441
  },
  {
    "id": 1119,
    "titleKey": "bhutan",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 975
  },
  {
    "id": 717,
    "titleKey": "bolivia.+591",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 591
  },
  {
    "id": 1100,
    "titleKey": "bosnia.+387",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 387
  },
  {
    "id": 718,
    "titleKey": "botswana.+267",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 267
  },
  {
    "id": 719,
    "titleKey": "brazil.+55",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 55
  },
  {
    "id": 720,
    "titleKey": "brunei.+673",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 673
  },
  {
    "id": 722,
    "titleKey": "burkina-faso.+226",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 226
  },
  {
    "id": 723,
    "titleKey": "burma.+95",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 95
  },
  {
    "id": 724,
    "titleKey": "burundi.+257",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 257
  },
  {
    "id": 726,
    "titleKey": "cameroon.+1",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 237
  },
  {
    "id": 1063,
    "titleKey": "canada.+1",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 2
  },
  {
    "id": 727,
    "titleKey": "cayman.is..+1345",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1345
  },
  {
    "id": 728,
    "titleKey": "central.african.republic.+236",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 236
  },
  {
    "id": 729,
    "titleKey": "chad.+235",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 235
  },
  {
    "id": 730,
    "titleKey": "chile.+56",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 56
  },
  {
    "id": 732,
    "titleKey": "colombia.+57",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 57
  },
  {
    "id": 733,
    "titleKey": "congo.+242",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 242
  },
  {
    "id": 734,
    "titleKey": "cook.is..+682",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 682
  },
  {
    "id": 735,
    "titleKey": "costa.rica.+506",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 506
  },
  {
    "id": 736,
    "titleKey": "croatia.+385",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 385
  },
  {
    "id": 737,
    "titleKey": "cuba.+53",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 53
  },
  {
    "id": 738,
    "titleKey": "cyprus.+357",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 357
  },
  {
    "id": 739,
    "titleKey": "czech.republic.+420",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 420
  },
  {
    "id": 740,
    "titleKey": "denmark.+45",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 45
  },
  {
    "id": 741,
    "titleKey": "djibouti.+253",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 253
  },
  {
    "id": 742,
    "titleKey": "dominica.rep..+1890",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1890
  },
  {
    "id": 743,
    "titleKey": "ecuador.+593",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 593
  },
  {
    "id": 744,
    "titleKey": "egypt.+20",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 20
  },
  {
    "id": 745,
    "titleKey": "eisalvador.+503",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 503
  },
  {
    "id": 746,
    "titleKey": "estonia.+372",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 372
  },
  {
    "id": 747,
    "titleKey": "ethiopia.+251",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 251
  },
  {
    "id": 748,
    "titleKey": "fiji.+679",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 679
  },
  {
    "id": 749,
    "titleKey": "finland.+358",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 358
  },
  {
    "id": 750,
    "titleKey": "france.+33",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 33
  },
  {
    "id": 751,
    "titleKey": "french.guiana.+594",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 594
  },
  {
    "id": 834,
    "titleKey": "french.polynesia.+689",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 689
  },
  {
    "id": 752,
    "titleKey": "gabon.+241",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 241
  },
  {
    "id": 753,
    "titleKey": "gambia.+220",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 220
  },
  {
    "id": 754,
    "titleKey": "georgia.+995",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 995
  },
  {
    "id": 755,
    "titleKey": "germany.+49",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 49
  },
  {
    "id": 757,
    "titleKey": "gibraltar.+350",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 350
  },
  {
    "id": 758,
    "titleKey": "greece.+30",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 30
  },
  {
    "id": 759,
    "titleKey": "grenada.+1809",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1809
  },
  {
    "id": 760,
    "titleKey": "guam.+1671",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1671
  },
  {
    "id": 761,
    "titleKey": "guatemala.+502",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 502
  },
  {
    "id": 762,
    "titleKey": "guinea.+224",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 224
  },
  {
    "id": 763,
    "titleKey": "guyana.+592",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 592
  },
  {
    "id": 764,
    "titleKey": "haiti.+509",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 509
  },
  {
    "id": 765,
    "titleKey": "honduras.+504",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 504
  },
  {
    "id": 694,
    "titleKey": "hongkong.+852",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 852
  },
  {
    "id": 766,
    "titleKey": "hungary.+36",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 36
  },
  {
    "id": 767,
    "titleKey": "iceland.+354",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 354
  },
  {
    "id": 769,
    "titleKey": "indonesia.+62",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 62
  },
  {
    "id": 770,
    "titleKey": "iran.+98",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 98
  },
  {
    "id": 771,
    "titleKey": "iraq.+964",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 964
  },
  {
    "id": 772,
    "titleKey": "ireland.+353",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 353
  },
  {
    "id": 773,
    "titleKey": "israel.+972",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 972
  },
  {
    "id": 774,
    "titleKey": "italy.+39",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 39
  },
  {
    "id": 775,
    "titleKey": "ivorycoast.+225",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 225
  },
  {
    "id": 776,
    "titleKey": "jamaica.+1876",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1876
  },
  {
    "id": 777,
    "titleKey": "japan.+81",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 81
  },
  {
    "id": 778,
    "titleKey": "jordan.+962",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 962
  },
  {
    "id": 779,
    "titleKey": "kampuchea.+855",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 855
  },
  {
    "id": 780,
    "titleKey": "kazakstan.+327",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 327
  },
  {
    "id": 783,
    "titleKey": "kenya.+254",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 254
  },
  {
    "id": 784,
    "titleKey": "korea.+82",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 82
  },
  {
    "id": 785,
    "titleKey": "kuwait.+965",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 965
  },
  {
    "id": 786,
    "titleKey": "kyrgyzstan.+331",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 331
  },
  {
    "id": 787,
    "titleKey": "laos.+856",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 856
  },
  {
    "id": 788,
    "titleKey": "latvia.+371",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 371
  },
  {
    "id": 789,
    "titleKey": "lebanon.+961",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 961
  },
  {
    "id": 790,
    "titleKey": "lesotho.+266",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 266
  },
  {
    "id": 791,
    "titleKey": "liberia.+231",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 231
  },
  {
    "id": 792,
    "titleKey": "libya.+218",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 218
  },
  {
    "id": 793,
    "titleKey": "liechtenstein.+423",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 423
  },
  {
    "id": 794,
    "titleKey": "lithuania.+370",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 370
  },
  {
    "id": 795,
    "titleKey": "luxembourg.+352",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 352
  },
  {
    "id": 796,
    "titleKey": "macao.+853",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 853
  },
  {
    "id": 797,
    "titleKey": "macedonia.+389",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 389
  },
  {
    "id": 798,
    "titleKey": "madagascar.+261",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 261
  },
  {
    "id": 799,
    "titleKey": "malawi.+265",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 265
  },
  {
    "id": 800,
    "titleKey": "malaysia.+60",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 60
  },
  {
    "id": 801,
    "titleKey": "maldives.+960",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 960
  },
  {
    "id": 802,
    "titleKey": "mali.+223",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 223
  },
  {
    "id": 803,
    "titleKey": "malta.+356",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 356
  },
  {
    "id": 804,
    "titleKey": "mariana.is.+1670",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1670
  },
  {
    "id": 805,
    "titleKey": "martinique.+596",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 596
  },
  {
    "id": 806,
    "titleKey": "mauritius.+230",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 230
  },
  {
    "id": 807,
    "titleKey": "mexico.+52",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 52
  },
  {
    "id": 808,
    "titleKey": "moldova,.republic.of.+373",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 373
  },
  {
    "id": 809,
    "titleKey": "monaco.+377",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 377
  },
  {
    "id": 810,
    "titleKey": "mongolia.+976",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 976
  },
  {
    "id": 811,
    "titleKey": "montenegro.+382",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 382
  },
  {
    "id": 812,
    "titleKey": "montserrat.is.+1664",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1664
  },
  {
    "id": 813,
    "titleKey": "morocco.+212",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 212
  },
  {
    "id": 814,
    "titleKey": "mozambique.+258",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 258
  },
  {
    "id": 815,
    "titleKey": "namibia.+264",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 264
  },
  {
    "id": 816,
    "titleKey": "nauru.+674",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 674
  },
  {
    "id": 817,
    "titleKey": "nepal.+977",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 977
  },
  {
    "id": 818,
    "titleKey": "netheriands.+599",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 599
  },
  {
    "id": 819,
    "titleKey": "netherlands.+31",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 31
  },
  {
    "id": 820,
    "titleKey": "newzealand.+64",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 64
  },
  {
    "id": 821,
    "titleKey": "nicaragua.+505",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 505
  },
  {
    "id": 822,
    "titleKey": "niger.+227",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 227
  },
  {
    "id": 823,
    "titleKey": "nigeria.+234",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 234
  },
  {
    "id": 824,
    "titleKey": "north.korea.+850",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 850
  },
  {
    "id": 825,
    "titleKey": "norway.+47",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 47
  },
  {
    "id": 826,
    "titleKey": "oman.+968",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 968
  },
  {
    "id": 828,
    "titleKey": "panama.+507",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 507
  },
  {
    "id": 829,
    "titleKey": "papua.new.cuinea.+675",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 675
  },
  {
    "id": 830,
    "titleKey": "paraguay.+595",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 595
  },
  {
    "id": 831,
    "titleKey": "peru.+51",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 51
  },
  {
    "id": 832,
    "titleKey": "philippines.+63",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 63
  },
  {
    "id": 833,
    "titleKey": "poland.+48",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 48
  },
  {
    "id": 835,
    "titleKey": "portugal.+351",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 351
  },
  {
    "id": 836,
    "titleKey": "puertorico.+1787",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1787
  },
  {
    "id": 837,
    "titleKey": "qatar.+974",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 974
  },
  {
    "id": 838,
    "titleKey": "reunion.+262",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 262
  },
  {
    "id": 839,
    "titleKey": "romania.+40",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 40
  },
  {
    "id": 1091,
    "titleKey": "rwandese",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 250
  },
  {
    "id": 841,
    "titleKey": "saint.lueia.+1758",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1758
  },
  {
    "id": 842,
    "titleKey": "saint.vincent.+1784",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 1784
  },
  {
    "id": 843,
    "titleKey": "samoa.eastern.+684",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 684
  },
  {
    "id": 844,
    "titleKey": "samoa.western.+685",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 685
  },
  {
    "id": 845,
    "titleKey": "san.marino.+378",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 378
  },
  {
    "id": 846,
    "titleKey": "sao.tome.and.principe.+239",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 239
  },
  {
    "id": 847,
    "titleKey": "saudi.arabia.+966",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 966
  },
  {
    "id": 848,
    "titleKey": "senegal.+221",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 221
  },
  {
    "id": 849,
    "titleKey": "serbia.+381",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 381
  },
  {
    "id": 850,
    "titleKey": "seychelles.+248",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 248
  },
  {
    "id": 851,
    "titleKey": "sierra.leone.+232",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 232
  },
  {
    "id": 852,
    "titleKey": "singapore.+65",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 65
  },
  {
    "id": 853,
    "titleKey": "slovakia.+421",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 421
  },
  {
    "id": 854,
    "titleKey": "slovenia.+386",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 386
  },
  {
    "id": 855,
    "titleKey": "solomon.is.+677",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 677
  },
  {
    "id": 856,
    "titleKey": "somali.+252",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 252
  },
  {
    "id": 857,
    "titleKey": "south.africa.+27",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 27
  },
  {
    "id": 858,
    "titleKey": "spain.+34",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 34
  },
  {
    "id": 859,
    "titleKey": "sri.lanka.+94",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 94
  },
  {
    "id": 862,
    "titleKey": "sudan.+249",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 249
  },
  {
    "id": 863,
    "titleKey": "suriname.+597",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 597
  },
  {
    "id": 864,
    "titleKey": "swaziland.+268",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 268
  },
  {
    "id": 865,
    "titleKey": "sweden.+46",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 46
  },
  {
    "id": 866,
    "titleKey": "switzerland.+41",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 41
  },
  {
    "id": 867,
    "titleKey": "syria.+963",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 963
  },
  {
    "id": 868,
    "titleKey": "taiwan.+886",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 886
  },
  {
    "id": 869,
    "titleKey": "tajikstan.+992",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 992
  },
  {
    "id": 870,
    "titleKey": "tanzania.+255",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 255
  },
  {
    "id": 871,
    "titleKey": "thailand.+66",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 66
  },
  {
    "id": 872,
    "titleKey": "togo.+228",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 228
  },
  {
    "id": 873,
    "titleKey": "tonga.+676",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 676
  },
  {
    "id": 875,
    "titleKey": "tunisia.+216",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 216
  },
  {
    "id": 876,
    "titleKey": "turkey.+90",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 90
  },
  {
    "id": 877,
    "titleKey": "turkmenistan.+993",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 993
  },
  {
    "id": 878,
    "titleKey": "uganda.+256",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 256
  },
  {
    "id": 879,
    "titleKey": "ukraine.+380",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 380
  },
  {
    "id": 880,
    "titleKey": "united.arab.emirates.+971",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 971
  },
  {
    "id": 883,
    "titleKey": "uruguay.+598",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 598
  },
  {
    "id": 947,
    "titleKey": "uzbekistan.+233",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 998
  },
  {
    "id": 885,
    "titleKey": "venezuela.+233",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 58
  },
  {
    "id": 886,
    "titleKey": "vietnam.+84",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 84
  },
  {
    "id": 887,
    "titleKey": "yemen.+967",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 967
  },
  {
    "id": 948,
    "titleKey": "yugoslavia.+338",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 338
  },
  {
    "id": 890,
    "titleKey": "zaire.+243",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 243
  },
  {
    "id": 891,
    "titleKey": "zambia.+260",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 260
  },
  {
    "id": 889,
    "titleKey": "zimbabwe.+381",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 263
  },
  {
    "id": 721,
    "titleKey": "保加利亚.+359",
    "typeName": "nationaal",
    "parentId": 0,
    "index": 0,
    "value": 359
  }
]
