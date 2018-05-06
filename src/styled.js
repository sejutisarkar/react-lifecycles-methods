import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
  font-family: sans-serif;
`

Flex.displayName = "Flex"

export const Column = styled(Flex)`
  flex-direction:column;
  align-items: flex-start;
`

Column.displayName = "Column"

export const Row = styled(Flex)`
  align-items: flex-start;
`

Row.displayName = "Row"

export const Parent = styled(Row)`
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
  border: 3px groove blue;
`

Parent.displayName = "Parent"

export const ChildContainer = styled(Column)`
  background-color: cyan;
  padding: 20px;
  border-radius: 10px;
  border: 3px groove purple;
  margin-top: 20px;
`

ChildContainer.displayName = "ChildContainer"

export const LoggerContainer = styled(Column)`
  background-color: aliceblue;
  padding: 20px;
  border: 3x groove aquamarine;
  border-radius: 10px;
`

LoggerContainer.displayName = "LoggerContainer"

export const H2 = styled.h2`
`

H2.displayName = "H2"


export const H4 = styled.h4`
`

H4.displayName = "H4"

export const H5 = styled.h5`

`
H5.displayName = "H5"
