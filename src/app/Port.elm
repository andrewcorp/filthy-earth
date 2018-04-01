port module Port exposing (..)

import Map


-- Incoming Subscriptions


port receiveData : (() -> msg) -> Sub msg



-- Outgoing Port


port initializeMap : Map.JsObject -> Cmd msg


port filterOn : String -> Cmd msg
