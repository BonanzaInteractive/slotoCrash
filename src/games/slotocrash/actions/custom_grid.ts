import BigNumber from "bignumber.js";
import { IRandom, RandomObj } from "../../../libs/engine/generic/rng/Random";
import { SlotSpinState } from "../../../libs/engine/slots/models/slot_state_model";
import { RandomHelper } from "../../../libs/engine/slots/utils/random";
import { SlotocrashMath } from "../models/slotocrash_math";
import { WeightedSymbols } from "../../../libs/engine/slots/models/slot_math_model";

export class CustomGrid {

    static AddBlastSymbol( rng :IRandom, state :SlotSpinState, math :SlotocrashMath ) {
        const addBlast :any = RandomHelper.GetRandomFromList( rng, math.blastProb );
        if ( addBlast.add ) {
            const pos :RandomObj = rng.getRandom( new RandomObj(0, 3, -1) );
            state.initialGrid[pos.num][0] = math.blastSymbol;
        }
    }

    static AddNewReel( rng :IRandom, state :SlotSpinState, math :SlotocrashMath, accumulated :number){
        const d = 100000;
        let prob :number;
        if (state.initialGrid.length < 10) {
            prob = state.multiplier * 0.2 / (accumulated + state.multiplier * 0.2);
        } else {
            prob = state.multiplier * 0.25 / (accumulated + state.multiplier * 0.25);
        }
        prob *= d;
        const value :RandomObj = rng.getRandom( new RandomObj(0, d, -1) )
        if ( value.num < prob ) {
            state.initialGrid.push( [math.blastSymbol] );
        } else {
            const symbol :WeightedSymbols = RandomHelper.GetRandomFromList(rng, math.symbols) as WeightedSymbols;
            state.initialGrid.push( [ symbol.symbol] );
        }
    }

}
