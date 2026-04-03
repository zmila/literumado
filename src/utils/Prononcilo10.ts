export class Prononcilo10 {

    prononcuNombron(dekuma: string): string { 
        if (dekuma.length === 0 || dekuma === "0") {
            return dekuma === "0" ? "nulo" : "";
        }
        
        const isNegative = dekuma.startsWith("-");
        const numStr = isNegative ? dekuma.substring(1) : dekuma;
        
        const ciferoj = this.prononcuCiferojn(numStr);
        let result: string;
        
        if (numStr.length <= 3) {
            result = this.prononcu3(ciferoj);
        } else if (numStr.length <= 6) {
            const lastaj3 = ciferoj.slice(-3);
            const unuaj = ciferoj.slice(0, ciferoj.length - 3);
            const kapo = this.prononcuKapon(this.prononcu3(unuaj), "mil");
            const vosto = this.prononcu3(lastaj3);
            result = this.gluu(kapo, vosto);
        } else {
            throw new Error("Malbona longo de dekuma: " + dekuma);
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
        }
        throw new Error(`Nekonata cifero: ${cifero}`);
    }

    prononcuCiferojn(dekuma: string): string[] {
        return dekuma.split("").map(c => this.prononcuCiferon(c));
    }

    prononcuKapon(cifero: string, bazo: string): string {
        if (cifero === "nulo" || cifero === "") {
            return "";
        }
        if (cifero === "unu") {
            return bazo;
        }
        if (bazo === "dek" || bazo === "cent") {
            return cifero + bazo;
        }
        return cifero + " " + bazo;
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

    prononcuDD(dekuma: string[]): string {
        if (dekuma.length !== 2) {
            throw new Error("Malbona parametro por prononcuDD: " + dekuma);
        }
        const s1 = dekuma[1];
        const s2 = this.prononcuKapon(dekuma[0], "dek");
        return this.gluu(s2, s1);
    }

    prononcuDDD(dekuma: string[]): string {
        if (dekuma.length !== 3) {
            throw new Error("Malbona parametro por prononcuDDD: " + dekuma);
        }
        const dd = this.prononcuDD([dekuma[1], dekuma[2]]);
        const kapo = this.prononcuKapon(dekuma[0], "cent");
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
        throw new Error("Malbona longo de dekuma: " + ciferoj);
    }

}
