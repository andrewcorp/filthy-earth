port module Port exposing (filterOn, initializeMap, receiveData)

import Types exposing (..)



-- Incoming Subscriptions


port receiveData : (() -> msg) -> Sub msg



-- Outgoing Port


port initializeMap : MapObject -> Cmd msg


port filterOn : Model -> Cmd msg
