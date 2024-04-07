import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')

const store =  new Vuex.Store({
  // アプリで共有されるデータ
  state: {
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  // Stateを変更する唯一の方法
  mutations: {
    // state 現在のストアの状態、payload アクションから渡されたデータ
    // actions から呼ばれた
    addlistMutation(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
    removelistMutation(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToListMutation(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    removeCardFromListMutation(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateListMutation(state, payload) {
      state.lists = payload.lists
    }
  },
 
  actions: {
    // コミットするとストア内の状態が変更される
    // methods addList から呼ばれた
    addlistAction(context, payload) {
      // mutations の呼び出し
      context.commit('addlistMutation', payload)
    },
    removelistAction(context, payload) {
      context.commit('removelistMutation', payload)
    },

    //カード追加 method addCardToList から呼ばれた
    addCardToListAction(context, payload) {
      context.commit('addCardToListMutation', payload)
    },

    removeCardFromListAction(context, payload) {
      context.commit('removeCardFromListMutation', payload)
    },

    updateListAction(context, payload) {
      context.commit('updateListMutation', payload)
    }
  },
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
  }
})

// データの状態を更新後にlocalStorageへデータの状態を保存
store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store
