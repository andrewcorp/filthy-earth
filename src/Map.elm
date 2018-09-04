module Map exposing (init, toJsObject)

import Types exposing (..)


init : MapModel
init =
    { latitude = 39.0
    , longitude = 34.0
    }


toJsObject : List Poi -> MapModel -> MapObject
toJsObject data model =
    { lat = model.latitude
    , lng = model.longitude
    , locations = data
    }
