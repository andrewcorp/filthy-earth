port module Port exposing (..)

import Map
import Types exposing (..)


-- Outgoing Port


port initializeMap : Map.JsObject -> Cmd msg


port filterOn : String -> Cmd msg
