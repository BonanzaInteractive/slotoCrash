import BigNumber from "bignumber.js";
import { WeightedSymbols } from "../../../libs/engine/slots/models/slot_math_model";
import { PlatformMath } from "../../../libs/platform/base/platform_math";

export class SlotocrashMath extends PlatformMath {

    public blastProb :AddBlastProb[] = [];
    public blastSymbol :number = 3;
    public symbols :WeightedSymbols[] = [];

    constructor(){
        super();

        this.defaultgrid = [[0], [3], [2]];
        this.info = {
            betMultiplier : new BigNumber(1),
            gridLayout : [1, 1, 1],
            wildSymbols : [],
            payLines : [],
            symbols : [
                { name : "Sym1", id : 0, payout : [ this.bd(0), this.bd(0.1)]},
                { name : "Sym2", id : 1, payout : [ this.bd(0), this.bd(0.2)]},
                { name : "Sym3", id : 2, payout : [ this.bd(0), this.bd(0.5)]},
                { name : "BLAST", id : this.blastSymbol, payout : []}
            ]
        };

        this.blastProb = [ { weight:6761 , add:false}, {weight:3239 , add:true} ];

        this.paidReels = [{
            id:"", reels:[], 
            symbols:[{ symbol:0, weight:75}, { symbol:1, weight:20}, { symbol:2, weight:5} ]
        }];
        this.symbols = [{ symbol:0, weight:6}, { symbol:1, weight:2}, { symbol:2, weight:2} ];
        this.conditions = [{ "symbol": -1, "id": "freespins"} as any ];
        this.actions = [ 
            { "triggers":["freespin", "collect"], "spins":1 } as any ,
            { "triggers":["retrigger", "collect"], "spins":1 } as any 
        ];
    }

}

class AddBlastProb {
    public weight :number;
    public add :boolean;
}

