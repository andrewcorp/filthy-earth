module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, id, placeholder)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (field, float, int, list, map6, string)
import Map
import Maybe exposing (withDefault)
import Port exposing (..)
import Types exposing (..)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Msg )
init =
    ( { title = "f***** E@r+h"
      , map = Map.init
      , filterStr = Nothing
      , data = []
      }
    , getData
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FilterMap str ->
            ( { model | filterStr = Just str }, filterOn str )

        ReceiveData (Ok locations) ->
            ( { model | data = locations }
            , Cmd.batch
                [ Map.init
                    |> Map.toJsObject
                    |> Port.initializeMap
                ]
            )

        ReceiveData (Err e) ->
            let
                _ =
                    Debug.log "decode error" e
            in
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div [ class "wrapper" ]
        [ filterBar model
        , div [ class "map", id "map" ] []
        ]


filterBar : Model -> Html Msg
filterBar model =
    div
        [ class "filter-bar" ]
        [ h1 [ class "display" ] [ text model.title ]
        , h2 [ class "subheading filter-bar__title" ] [ text "Search the globe" ]
        , input [ class "filter-bar__input", placeholder "Search", onInput FilterMap ] []
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



--HTTP


getData : Cmd Msg
getData =
    Http.send ReceiveData <|
        Http.get "/data/data.json" (list poiDecoder)


poiDecoder : Json.Decode.Decoder Poi
poiDecoder =
    map6 Poi
        (field "id" int)
        (field "name" string)
        (field "city" string)
        (field "country" string)
        (field "latitude" float)
        (field "longitude" float)
