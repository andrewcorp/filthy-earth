module Types exposing (..)

import Http
import Map


type alias Poi =
    { id : Int
    , name : String
    , city : String
    , country : String
    , latitude : Float
    , longitude : Float
    }


type alias Model =
    { title : String
    , map : Map.Model
    , filterStr : Maybe String
    , data : List Poi
    }


type Msg
    = FilterMap String
    | ReceiveData (Result Http.Error (List Poi))
