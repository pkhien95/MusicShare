import { createStackNavigator } from '@react-navigation/stack'
import { SearchScreen } from '../features/search'
import NAVIGATORS from '../constants/navigators'
import React from 'react'
import { DEFAULT_OPTIONS } from '../theme/navigators'

const SearchStack = createStackNavigator()

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={NAVIGATORS.search}
        component={SearchScreen}
        options={DEFAULT_OPTIONS}
      />
    </SearchStack.Navigator>
  )
}

export default SearchStackNavigator
