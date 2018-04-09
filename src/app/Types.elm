module Types exposing (..)

import Http


type alias MapModel =
    { latitude : Float
    , longitude : Float
    }


type alias MapObject =
    { lat : Float
    , lng : Float
    , locations : List Poi
    }


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
    , map : MapModel
    , filterStr : Maybe String
    , data : List Poi
    }


type Msg
    = FilterMap String
    | ReceiveData (Result Http.Error (List Poi))
