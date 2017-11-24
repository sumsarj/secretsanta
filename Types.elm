module Types exposing (..)

type alias Model = 
  { view : View
  , name : String
  , group_name : String 
  , vald : String }


type Msg = 
  Name String |
  GroupName String |
  Fetch |
  Message String


type View = 
  StartView |
  ResultView
