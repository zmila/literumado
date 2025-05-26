export class EkvilibraKonvertilo {

    alEkvilibra(dekuma: number, base: number): string {
        const res: number[] = [];

        let num = dekuma
        const half = Math.floor(base / 2);

        let reps = 0

        while (num != 0  && reps < 10) {
            let rem: number = num % base;
            num = Math.trunc(num / base);

            if (rem > half) {
                num = num + 1;
                rem = rem - base;
            } else if (rem < -half) {
                num = num - 1;
                rem = rem + base;
            }
            res.push(rem);
            reps++;
        }

        if (res.length == 0) {
            res.push(0);
        }

        return res.reverse().join(" ");
    }

    alDekuma(ekvilibra: string, bazo: number): number {

        const digits = ekvilibra.split(" ")
        let dek = 0;
        digits.forEach(item => {
            if (item) {
                const d = Number.parseInt(item)
                dek = dek * bazo + d
            }
        })

        return dek;
    }
}
