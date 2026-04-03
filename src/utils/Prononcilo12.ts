export class Prononcilo12 {

    prononcuNombron(dekduuma: string): string { 
        if (dekduuma.length === 0 || dekduuma === "0") {
            return dekduuma === "0" ? "nulo" : "";
        }
        
        const isNegative = dekduuma.startsWith("-");
        const numStr = isNegative ? dekduuma.substring(1) : dekduuma;
        
        const ciferoj = this.prononcuCiferojn(numStr);
        let result: string;
        
        if (numStr.length <= 3) {
            result = this.prononcu3(ciferoj);
        } else if (numStr.length <= 6) {
            const lastaj3 = ciferoj.slice(-3);
            const unuaj = ciferoj.slice(0, ciferoj.length - 3);
            const kapo = this.prononcuKapon(this.prononcu3(unuaj), "mas", true);
            const vosto = this.prononcu3(lastaj3);
            result = this.gluu(kapo, vosto);
        } else {
            throw new Error("Malbona longo de dekduuma: " + dekduuma);
        }
        
        return isNegative ? "minus " + result : result;
    }

    prononcuCiferon(cifero: string): string {
        switch (cifero) {
            case '0': return "nulo";
            case '1': return "unu";
            case '2': return "du";
            case '3': return "tri";
            case '4': return "kvar";
            case '5': return "kvin";
            case '6': return "ses";
            case '7': return "sep";
            case '8': return "ok";
            case '9': return "naŭ";
            case 'A': return "dek";
            case 'B': return "elv";
            // case '10': return "tuz";
            // case '100': return "groc";
            // case '1000': return "mas";
        }
        throw new Error(`Nekonata cifero: ${cifero}`);
    }

    prononcuCiferojn(dekduuma: string): string[] {
        return dekduuma.split("").map(c => this.prononcuCiferon(c));
    }

    prononcuKapon(cifero: string, bazo: string, kunSpaco: boolean = false): string {
        if (cifero === "nulo" || cifero === "") {
            return "";
        }
        if (cifero === "unu") {
            return bazo;
        }
        return cifero + (kunSpaco ? " " : "") + bazo;
    }

    gluu(kapo: string, vosto: string): string {
        if (kapo === "" || kapo === "nulo") {
            return vosto;
        }
        if (vosto === "" || vosto === "nulo") {
            return kapo;
        }
        return kapo + " " + vosto;
    }

    prononcuDD(dekduuma: string[]): string {
        if (dekduuma.length !== 2) {
            throw new Error("Malbona parametro por prononcuDD: " + dekduuma);
        }
        const s1 = dekduuma[1];
        const s2 = this.prononcuKapon(dekduuma[0], "tuz");
        return this.gluu(s2, s1);
    }

    prononcuDDD(dekduuma: string[]): string {
        if (dekduuma.length !== 3) {
            throw new Error("Malbona parametro por prononcuDDD: " + dekduuma);
        }
        const dd = this.prononcuDD([dekduuma[1], dekduuma[2]]);
        const kapo = this.prononcuKapon(dekduuma[0], "groc");
        return this.gluu(kapo, dd);
    }

    prononcu3(ciferoj: string[]): string {
        // create numeration of duodecimal number with words
        if (ciferoj.length === 0) {
            return "";
        }
        if (ciferoj.length === 1) {
            return ciferoj[0];
        }
        if (ciferoj.length === 2) {
            return this.prononcuDD(ciferoj);
        }
        if (ciferoj.length === 3) {
            return this.prononcuDDD(ciferoj);
        }
        throw new Error("Malbona longo de dekduuma: " + ciferoj);
    }

}
