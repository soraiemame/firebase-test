export type Reservation = {
    name: string
    purpose: string
    reserved: boolean
    dateId: number
    date: string
    frameId: number
    frame: string
    companions: string[]
}

type Timetable = {
    dates: string[]
    frames: string[]
    reservations: Reservation[][]
}

type PostRequest = {
    action: 'reserve' | 'cancel'
    request: Reservation & { password: string }
}

type PostResponse =
    | {
          status: 'success'
      }
    | {
          status: 'error'
          message: string
      }
