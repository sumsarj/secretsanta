module State exposing (init, update, subscriptions)


import Types exposing (..)
import WebSocket

init : (Model, Cmd Msg)
init = 
  (
   { view = StartView
   , name = ""
   , group_name = ""
   , vald = ""
   }, Cmd.none)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model = 
  case msg of
    Name firstName -> ({model | name = firstName}, Cmd.none)
    GroupName familyName -> ({model | group_name = familyName},Cmd.none)
    Fetch -> (model, WebSocket.send "ws://localhost:8080"
                     ("fetch|" ++ model.group_name ++"|" ++ model.name) )


    Message message ->
      let
        temp = String.split "|" message
        paramstmp = List.drop 1 temp
        params = List.head paramstmp
        method = List.head temp
      in
        websocketMessage model method params



websocketMessage : Model -> Maybe String -> Maybe String -> (Model, Cmd Msg)
websocketMessage model method params = 
  case extract method of
    "fetch" -> {model | vald = (extract params), view = ResultView} ! []
    "Kunde ej hittas" -> {model | vald = "Kunde ej hittas"} ! []
    _          -> model ! []



extract : Maybe String -> String
extract x = case x of
               (Just x) -> x
               Nothing -> "Kunde ej hittas"

subscriptions : Model -> Sub Msg
subscriptions model = 
  Sub.batch [WebSocket.listen "ws://localhost:8080" Message]    
