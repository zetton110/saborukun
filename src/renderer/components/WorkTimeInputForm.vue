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
    <br>
    <div class="input-area">
      <div v-if="modeInputWorkTimeDiff" class="panel">
          <div>
              <label>勤務時間差理由:</label>
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
              <label>始業時間差理由:</label>
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
              <label>終業時間差理由:</label>
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
    <br>
    <div v-if="modeInputWorkTimeDiff || modeInputStartTimeDiff || modeInputEndTimeDiff">
      <button 
        class="square_btn"
        @click="save"
        v-bind:disabled="
        ((modeInputWorkTimeDiff === true) && (reasonForWorkTimeDiff === '') ||
        (modeInputStartTimeDiff === true) && (reasonForStartTimeDiff === '') ||
        (modeInputEndTimeDiff === true) && (reasonForEndTimeDiff === ''))">
        入力開始
      </button>
      <!--
      <button @click="deleteAll">全削除</button>
      <button @click="findAll">検索</button>
      -->
    </div>
  </div>
</template>

<script>
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
          .exec((err, docs) => {
            console.log(err)
            this.histReasonsForWT = docs
          })
      },
      findReasonsForSTDiff () {
        this.$db.find({ reasonForStartTimeDiff: { $exists: true } })
          .sort({ created_at: -1 })
          .limit(10)
          .exec((err, docs) => {
            console.log(err)
            this.histReasonsForST = docs
          })
      },
      findReasonsForETDiff () {
        this.$db.find({ reasonForEndTimeDiff: { $exists: true } })
          .sort({ created_at: -1 })
          .limit(10)
          .exec((err, docs) => {
            console.log(err)
            this.histReasonsForET = docs
          })
      },
      findAll () {
        this.findReasonsForWTDiff()
        this.findReasonsForSTDiff()
        this.findReasonsForETDiff()
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
  .error-text{
    color: red;
    font-size: 0.9em;
  }
  .square_btn{
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    position:fixed;
    bottom: 96px;
}
.square_btn:disabled{
    background: #424a5a;/*ボタン色*/
}
</style>
