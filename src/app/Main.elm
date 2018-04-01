module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
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
    ( { title = "Filthy Earth"
      , map = Map.init
      , filterOn = Nothing
      }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FilterMap str ->
            ( { model | filterOn = Just str }, filterOn str )

        ReceiveData ->
            ( model
            , Cmd.batch
                [ Map.init
                    |> Map.toJsObject
                    |> Port.initializeMap
                ]
            )


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
    receiveData (always ReceiveData)
