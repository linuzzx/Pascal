function Solution(penalty, time, scramble, comment, date) {
    this.penalty = penalty;//OK = 0, +2 = 2000, DNF = -1
    this.time = time;//ms
    this.scramble = scramble;
    this.comment = comment;
    this.date = date;//Date.now().toString().split("").slice(0, 10).join("")
}
// ID ???