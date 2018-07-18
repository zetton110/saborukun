<template>
  <div>
    <div>
      CWSへ勤務実績を自動で入力します。
    </div>
    <br>
    <div>
      <h3>入力内容</h3>
    </div>
    <div>
      <p>
          <input type="checkbox" id="chkWorkTimeDiff" v-model="modeInputWorkTimeDiff"><label for="chkWorkTimeDiff" class="input-content-label">勤務時間差理由</label>
          <input type="checkbox" id="chkStartTimeDiff" v-model="modeInputStartTimeDiff"><label for="chkStartTimeDiff" class="input-content-label">始業時間差理由</label>
          <input type="checkbox" id="chkEndTimeDiff" v-model="modeInputEndTimeDiff"><label for="chkEndTimeDiff" class="input-content-label">終業時間差理由</label>
      </p>
    </div>
    <div v-if="$store.state.App.calling">
      <span class="cp_loading01 cp_item"> </span>
    </div>
    <div class="input-area">
      <div v-if="modeInputWorkTimeDiff" class="panel">
          <div>
              <label class="label-reason">勤務時間差理由</label>
              <br>
              <textarea v-bind:class="{ 'error': (reasonForWorkTimeDiff === '')}"  v-model="reasonForWorkTimeDiff" class="reason-area"></textarea>
          </div>
          <div v-if="histReasonsForWT.length === 0">
            （ 履歴なし ）
          </div>
          <div v-else>
            <select size="6" v-model="reasonForWorkTimeDiff">
              <option class="option-area" v-for="(h, index) in histReasonsForWT" :key="index">{{ h.reasonForWorkTimeDiff }}</option>
　          </select>
          </div>
      </div>
      <div v-if="modeInputStartTimeDiff" class="panel">
          <div>
              <label class="label-reason">始業時間差理由</label>
              <br>
              <textarea v-bind:class="{ 'error': (reasonForStartTimeDiff === '')}" v-model="reasonForStartTimeDiff" class="reason-area"></textarea>
          </div>
          <div v-if="histReasonsForST.length === 0">
            （ 履歴なし ）
          </div>
          <div v-else>
            <select size="6" v-model="reasonForStartTimeDiff">
　            <option class="option-area" v-for="(h, index) in histReasonsForST" :key="index">{{ h.reasonForStartTimeDiff }}</option>
　          </select>
          </div>
      </div>
      <div v-if="modeInputEndTimeDiff" class="panel">
          <div>
              <label class="label-reason">終業時間差理由</label>
              <br>
              <textarea v-bind:class="{ 'error': (reasonForEndTimeDiff === '')}" v-model="reasonForEndTimeDiff" class="reason-area"></textarea>
          </div>
          <div v-if="histReasonsForET.length === 0">
            （ 履歴なし ）
          </div>
          <div v-else>
            <select size="6" v-model="reasonForEndTimeDiff">
　            <option class="option-area" v-for="(h, index) in histReasonsForET" :key="index">{{ h.reasonForEndTimeDiff }}</option>
　          </select>
          </div>
      </div>
    </div>
    <div class="error-text">
      <br>
      <div v-if="(modeInputWorkTimeDiff === true) && (reasonForWorkTimeDiff === '')">【ERROR】 勤務時間差理由を入力してください。</div>
      <div v-if="(modeInputStartTimeDiff === true) && (reasonForStartTimeDiff === '')">【ERROR】 始業時間差理由を入力してください。</div>
      <div v-if="(modeInputEndTimeDiff === true) && (reasonForEndTimeDiff === '')">【ERROR】 終業時間差理由を入力してください。</div>
      <div v-if="!(modeInputWorkTimeDiff || modeInputStartTimeDiff || modeInputEndTimeDiff)">【ERROR】 入力内容を選択してください。</div>
    </div>
    <div v-if="modeInputWorkTimeDiff || modeInputStartTimeDiff || modeInputEndTimeDiff">
      <button 
        class="square_btn"
        @click="autoInput"
        v-bind:disabled="
        ((modeInputWorkTimeDiff === true) && (reasonForWorkTimeDiff === '') ||
        (modeInputStartTimeDiff === true) && (reasonForStartTimeDiff === '') ||
        (modeInputEndTimeDiff === true) && (reasonForEndTimeDiff === ''))">
        入力開始
      </button>
      <!--
      <button @click="deleteAll">全削除</button>
      <button @click="findAll">検索</button>
      <button @click="Up">Up</button>
      -->
    </div>
  </div>
</template>

<script>
  const PyExePath = process.env.NODE_ENV === 'development' ? require('path').join(__static, 'zangyo.exe') : require('path').join(process.resourcesPath, 'static/zangyo.exe')
  const ChromeExePath = process.env.NODE_ENV === 'development' ? require('path').join(__static, 'chromedriver.exe') : require('path').join(process.resourcesPath, 'static/chromedriver.exe')
  export default {
    name: 'worktimeinput-form',
    data () {
      return {
        modeInputWorkTimeDiff: false,
        modeInputStartTimeDiff: false,
        modeInputEndTimeDiff: false,
        reasonForWorkTimeDiff: '',
        reasonForStartTimeDiff: '',
        reasonForEndTimeDiff: '',
        hasError: false,
        histReasonsForWT: null,
        histReasonsForST: null,
        histReasonsForET: null
      }
    },
    mounted: function () {
      this.findReasonsForWTDiff()
      this.findReasonsForSTDiff()
      this.findReasonsForETDiff()
    },
    methods: {
      autoInput () {
        let optsArry = []
        optsArry.push('-x')
        optsArry.push(ChromeExePath)
        optsArry.push('-f')

        if (this.modeInputWorkTimeDiff) {
          let opt = '-o'
          let content = this.reasonForWorkTimeDiff
          optsArry.push(opt)
          optsArry.push(content)
        }
        if (this.modeInputStartTimeDiff) {
          let opt = '-s'
          let content = this.reasonForStartTimeDiff
          optsArry.push(opt)
          optsArry.push(content)
        }
        if (this.modeInputEndTimeDiff) {
          let opt = '-e'
          let content = this.reasonForEndTimeDiff
          optsArry.push(opt)
          optsArry.push(content)
        }
        this.kickExe(optsArry)
        this.save()
      },
      kickExe (opts) {
        this.$store.commit('TOGGLE')
        let cmd = PyExePath
        const spawn = require('child_process').spawn
        let proc = spawn(cmd, opts)
        //  標準出力取得
        proc.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`)
        })
        //  エラー出力取得
        proc.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`)
        })
        //  リターンコード取得
        proc.on('close', (code) => {
          console.log(`child process exited with code ${code}`)
          this.$store.commit('TOGGLE')
        })
      },
      save () {
        let dtNow = new Date()
        let obj = {}
        obj.created_at = dtNow
        if (this.modeInputWorkTimeDiff) { obj.reasonForWorkTimeDiff = this.reasonForWorkTimeDiff }
        if (this.modeInputStartTimeDiff) { obj.reasonForStartTimeDiff = this.reasonForStartTimeDiff }
        if (this.modeInputEndTimeDiff) { obj.reasonForEndTimeDiff = this.reasonForEndTimeDiff }
        this.$db.insert(obj)
        this.findAll()
      },
      deleteAll () {
        this.$db.remove({}, { multi: true })
        this.findAll()
      },
      findReasonsForWTDiff () {
        this.$db.find({ reasonForWorkTimeDiff: { $exists: true } })
          .sort({ created_at: -1 })
          .limit(10)
          .exec((error, docs) => {
            if (error !== null) {
              console.log('Exec error: ' + error)
            }
            let data = this.distinct(docs, 'reasonForWorkTimeDiff')
            this.histReasonsForWT = data
          })
      },
      findReasonsForSTDiff () {
        this.$db.find({ reasonForStartTimeDiff: { $exists: true } })
          .sort({ created_at: -1 })
          .limit(10)
          .exec((error, docs) => {
            if (error !== null) {
              console.log('Exec error: ' + error)
            }
            let data = this.distinct(docs, 'reasonForStartTimeDiff')
            this.histReasonsForST = data
          })
      },
      findReasonsForETDiff () {
        this.$db.find({ reasonForEndTimeDiff: { $exists: true } })
          .sort({ created_at: -1 })
          .limit(10)
          .exec((error, docs) => {
            if (error !== null) {
              console.log('Exec error: ' + error)
            }
            let data = this.distinct(docs, 'reasonForEndTimeDiff')
            this.histReasonsForET = data
          })
      },
      findAll () {
        this.findReasonsForWTDiff()
        this.findReasonsForSTDiff()
        this.findReasonsForETDiff()
      },
      Up () {
        this.$store.commit('TOGGLE')
      },
      distinct (arr, fieldName) {
        var arrObj = {}
        for (var i = 0; i < arr.length; i++) {
          arrObj[arr[i][fieldName]] = arr[i]
        }
        let newArr = []
        for (var key in arrObj) {
          newArr.push(arrObj[key])
        }
        return newArr
      }
    }
  }
</script>

<style scoped>
  .input-area{
    display: flex;
    flex-direction: row;
    justify-content :flex-start;
  }
  .reason-area{
    min-height: 50px;
  }
  .option-area{
    width: 200px;
  }
  .panel{
    margin-right: 16px;
  }
  .error{
    background-color: rgb(255, 129, 129);
  }
  .input-content-label{
    margin-right: 16px;
  }
  .label-reason{
    font-size: 0.8em;
  }
  .error-text{
    color: red;
    font-size: 0.8em;
  }
  .square_btn{
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    position:fixed;
    bottom: 32px;
  }
  .square_btn:disabled{
      background: #424a5a;
  }
  /**  loading  **/
  .loading-panel {
    position: fixed;
    background-color: black;
  }
  .cp_loading01 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  }
  .cp_loading01 {
  border: 1px solid #29b6f6;
  border-radius: 50px;
  }
  .cp_loading01:after {
  position: absolute;
  top: -12px;
  right: -12px;
  bottom: -12px;
  left: -12px;
  content: '';
  -webkit-animation: loading01 1s linear infinite;
  animation: loading01 1s linear infinite;
  border: 12px solid transparent;
  border-top-color: #29b6f6;
  border-radius: 80px;
  box-shadow: 0px 0px 0px 1px #29b6f6;
  }
  @-webkit-keyframes loading01 {
  0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  }
  100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  }
  }
  @keyframes loading01 {
  0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  }
  100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  }
  }
</style>
