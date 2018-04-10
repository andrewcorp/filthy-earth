module Data exposing (getData)

import Http
import Json.Decode exposing (field, float, int, list, map6, string)
import Types exposing (..)


--HTTP


dataUrl : String
dataUrl = "/data/data.json"


getData : Cmd Msg
getData =
    Http.send ReceiveData (Http.get dataUrl (list poiDecoder))


poiDecoder : Json.Decode.Decoder Poi
poiDecoder =
    map6 Poi
        (field "id" int)
        (field "name" string)
        (field "city" string)
        (field "country" string)
        (field "latitude" float)
        (field "longitude" float)
