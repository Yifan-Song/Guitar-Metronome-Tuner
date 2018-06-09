package com.zzbslayer.tuner.Util;

public class ReturnResult {
    private double freqTarget;
    private double freqCurrent;

    public void setFreqCurrent(double freqCurrent) {
        this.freqCurrent = freqCurrent;
    }

    public void setFreqTarget(double freqTarget) {
        this.freqTarget = freqTarget;
    }

    public double getFreqCurrent() {
        return freqCurrent;
    }

    public double getFreqTarget() {
        return freqTarget;
    }
}
