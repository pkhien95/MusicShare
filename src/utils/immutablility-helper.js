import { extend } from 'immutability-helper'
import { merge } from 'lodash'

extend('$deepMerge', (newObj, originObj) => ({ ...merge(originObj, newObj) }))
