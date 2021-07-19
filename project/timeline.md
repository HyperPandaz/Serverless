# Timeline
> Note: Copy and paste the task template (bottom of page)

## Week 1

### Set-up:

#### Description
- Make a clear plan of what has to be done

#### ETA:
> How long do you think it will take to complete this?
- [Replace with eta]

#### Objective:
> Checklist of everything you need to do to complete this issue
- [ ] update project tech and timeline
- [ ] create a flowchart
- [ ] decide on a JSON data format

## Week 2

## Week 3

## Week 4


---

<details><summary>Task Template</summary>
<br>

### [Task Name]:

#### Description
- [Replace with description]

#### ETA:
> How long do you think it will take to complete this?
- [Replace with eta]

#### Objective:
> Checklist of everything you need to do to complete this issue
- [ ] [Replace with small task  1]
- [ ] [Replace with small task  2]
- [ ] [Replace with small task  3]

<br><br>
</details>

[POST] /api/telemetry -
    This is endpoint will be used to ingest incoming telemetry


[GET] /api/telemetry/{deviceId}
Actual call - /api/telemetry/13w45
    This endpoint will return all races that has been performed by given deviceId
    

    
[GET] /api/telemetry/{deviceId}/{raceId}
Query blob storage, get all files where last modified data is greater than current timestamp(Note: there will be only one file any point in time but to handle edge cases, if we found more than one file just combine them together send it back to the client).

Actual call - /api/telemetry/car-01/race-01

[Good to have]Filter - ?startTime=timestamp&endTime=timestamp

telemetry is :
    {
    "deviceId": "Clyde4",
    "owner": "Jakub",
    "raceId": 123,
    "data": [
        {
            "fuelLevel": 9,
            "rpm": 60,
            "geolocation": {
                "lat": 20.90,
                "long": 30.09
            },
            "timestamp": "utc timestamp"
        },
        {
            "fuelLevel": 9,
            "rpm": 60,
            "geolocation": {
                "lat": 20.90,
                "long": 30.09
            },
            "timestamp": "utc timestamp"
        },{
            "fuelLevel": 9,
            "rpm": 60,
            "geolocation": {
                "lat": 20.90,
                "long": 30.09
            },
            "timestamp": "utc timestamp"
        }
    ]
}