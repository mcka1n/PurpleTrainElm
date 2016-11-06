module FetchRoutes exposing (fetchRoutes)

import Http
import Json.Decode as Decode

import Message exposing (..)
import Types exposing (..)

fetchRoutes: Cmd Msg
fetchRoutes =
  Http.send LoadRoutes getRoutes


getRoutes : Http.Request Routes
getRoutes =
    Http.get
        "https://commuter-api-production.herokuapp.com/api/v1/routes"
        decodeRoutes


decodeRoutes : Decode.Decoder Routes
decodeRoutes =
  Decode.map (List.map snd) (Decode.keyValuePairs decodeRoute)

decodeStops : Decode.Decoder Stops
decodeStops = Decode.list decodeStop


decodeStop : Decode.Decoder Stop
decodeStop = Decode.string

decodeRoute : Decode.Decoder Route
decodeRoute =
  Decode.map2 Route
    (Decode.field "route_name" Decode.string)
    (Decode.field "stops" decodeStops)