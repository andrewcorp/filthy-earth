module Types exposing (..)

import Map


type alias Model =
    { title : String
    , map : Map.Model
    , filterOn : Maybe String
    }


type Msg
    = FilterMap String
    | ReceiveData
