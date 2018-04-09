port module Port exposing (..)

import Types exposing (..)


-- Incoming Subscriptions


port receiveData : (() -> msg) -> Sub msg



-- Outgoing Port


port initializeMap : MapObject -> Cmd msg


port filterOn : String -> Cmd msg
