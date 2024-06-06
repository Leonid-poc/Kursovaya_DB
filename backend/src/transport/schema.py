from pydantic import BaseModel
from datetime import datetime

class BrandTSRead(BaseModel):
    id: int
    name: str

class BrandTSCreate(BaseModel):
    name: str

class ModelTSRead(BaseModel):
    id: int
    brand_id: int
    count_sit_places: int
    count_stay_places: int
    name: str

class ModelTSCreate(BaseModel):
    brand_id: int
    count_sit_places: int
    count_stay_places: int
    name: str

class TSRead(BaseModel):
    id: int
    model_id: int
    number_ts: str

class TSCreate(BaseModel):
    model_id: int
    number_ts: str

class BSRead(BaseModel):
    id: int
    name: str
    latitude: str
    longitude: str

class BSCreate(BaseModel):
    name: str
    latitude: str
    longtitude: str

class RouteRead(BaseModel):
    id: int
    bs_id: int
    number: str
    interval: str

class RouteCreate(BaseModel):
    bs_id: int
    number: str
    interval: str

class PlanTimeRead(BaseModel):
    id: int
    route_id: int
    bs_id: int
    time: datetime

class PlanTimeCreate(BaseModel):
    route_id: int
    bs_id: int
    time: datetime

class RealTimeRead(BaseModel):
    id: int
    route_id: int
    bs_id: int
    time: datetime

class RealTimeCreate(BaseModel):
    route_id: int
    bs_id: int
    time: datetime