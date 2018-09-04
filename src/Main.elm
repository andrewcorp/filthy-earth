module Main exposing (filterBar, init, main, update, view)

import Browser exposing (Document)
import Data exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, id, placeholder)
import Html.Events exposing (..)
import Map
import Port exposing (..)
import Types exposing (Model, Msg(..), Poi)
import String exposing (startsWith, toLower)

main : Program (Maybe Model) Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view = \model -> { title = "f***** E@r+h", body = [view model] }
        , subscriptions = \_ -> Sub.none
        }


init : Maybe Model -> ( Model, Cmd Msg )
init maybeModel =
    ( { heading = "f***** E@r+h"
      , map = Map.init
      , data = []
      }
    , getData
    )



compareString : String -> String -> Bool
compareString search toSearch = 
    startsWith (toLower search) (toLower toSearch)

filterList: String -> List Poi -> List Poi
filterList str list = 
    List.filter (\r -> compareString str r.name || compareString str r.city) list

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FilterMap str ->
            ( model, filterOn (filterList str model.data) )

        ReceiveData (Ok locations) ->
            ( { model | data = locations }
            , Cmd.batch
                [ Map.init
                    |> Map.toJsObject locations
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
        [ h1 [ class "display" ] [ text model.heading ]
        , h2 [ class "subheading filter-bar__title" ] [ text "Search the globe" ]
        , input [ class "filter-bar__input", placeholder "Search", onInput FilterMap ] []
        ]
