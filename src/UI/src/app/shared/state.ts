import { Injectable } from "@angular/core";
import { Box } from "../modules/management/models/box";
import { DashboardData } from "../modules/dashboard/models/DashboardData";

@Injectable({
    providedIn: 'root'  
})

export class State {   
    boxes: Box  [] = [];   
    chartData: DashboardData [] = [];
}