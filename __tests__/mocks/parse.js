'use strict';
/* eslint-disable */

const defaultReturn = (isError, returnData) => {
  console.log('file: parse.js ~ line 5 ~ defaultReturn ~ isError', isError)
  return {
    ...returnData,
    toJSON() {
      if (isError) throw new Error(returnData)
      return returnData
    }
  }
}

const basicFunctions = (isError, returnData) => {
  return {
    set() { },
    get() { returnData },
    save() {
      return defaultReturn(isError, returnData)
    },
    ...defaultReturn(isError, returnData)
  }
}

function parseMock(returnData, isError = false, isFalsy = false) {
  const data = isFalsy ? returnData : returnData || { objectId: '' }
  return {
    set() { },
    equalTo() { },
    get() {
      return isFalsy ? returnData : basicFunctions(isError, data)
    },
    exists() { },
    include() { },
    ascending() { },
    descending() { },
    limit() { },
    skip() { },
    withCount() { },
    aggregate() {
      return isFalsy ? returnData : basicFunctions(isError, data)
    },
    first() {
      return isFalsy ? returnData : defaultReturn(isError, data)
    },
    find() {
      return isFalsy ? returnData : [
        basicFunctions(isError, data)
      ]
    },
    findAll() {
      return isFalsy ? returnData : [
        basicFunctions(isError, data)
      ]
    },
    save() {
      return defaultReturn(isError, data)
    },
    containedIn() {
      return {
        find() {
          return [
            basicFunctions(isError, data)
          ]
        }
      }
    },
  }
}

const objectMock = (returnData, isError = false, isFalsy = false) => {
  const data = isFalsy ? returnData : returnData || { objectId: '' }
  return {
    extend(className) {
      console.log('extends calling', className)
      return function () {
        return parseMock(data, isError, isFalsy)
      }
    },
    saveAll() {
      return [
        basicFunctions(isError, data)
      ]
    }
  }
}

module.exports = {
  Query: function () { return parseMock() },
  Object: objectMock(),
  initialize() {
    console.log('mock initialization')
  },
  setupQueryConstructor(construct) {
    this.Query = construct
  },
  mockQueryStaticProperty(prop, mock) {
    this.Query[prop] = mock
  },
  mockObjectProperty(mock) {
    this.Object = mock
  },
  resetObjectProperty(data, isFalsy) {
    this.Object = objectMock(data, false, isFalsy)
  },
  mockObjectError(data) {
    this.Object = objectMock(data, true)
  },
  resetQueryProperty(data, isFalsy) {
    this.Query = function () { return parseMock(data, false, isFalsy) }
  },
  mockQueryError(data) {
    this.Query = function () { return parseMock(data, true) }
  }
}
