module View exposing (view)

import Types exposing (..)

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)

view : Model -> Html Msg
view model =
  case model.view of
    StartView -> 
      div []
           [
           div [style [ ("padding-left", "35%"), ("padding-right", "35%")]] 
             [
               h2 [class "form-signin-heading"] [text "Fyll i nedan och tryck \"God Jul!\""]
               , input [type_ "text", id "inputFamilj", class "form-control", 
                        placeholder "Ditt familjenamn", onInput GroupName] 
                       []
               , input [type_ "text", id "inputNamn", class "form-control", 
                        placeholder "Ditt förnamn", onInput Name] 
                       []
               , button [class "btn btn-lg btn-primary btn-block", onClick Fetch] 
                        [text "God Jul!"]
             ]
             ,stylesheet
           ]
    ResultView ->
      div []
           [
           div [style [ ("padding-left", "35%"), ("padding-right", "35%")]]
             [
               h2 [ class "form-signin-heading"] [text ("Du ska köpa till: " ++ model.vald) ]
 
             ]
             ,stylesheet
           ]



stylesheet : Html Msg
stylesheet =
    let
        tag =
            "link"
        attrs =
            [ attribute "Rel" "stylesheet"
            , attribute "property" "stylesheet"
            , attribute "href" "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            ]

        children =
            []
    in
        node tag attrs children
