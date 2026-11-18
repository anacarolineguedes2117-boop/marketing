#!/usr/bin/env bash
# Re-edição do vídeo "Terça da Serra Day": 1080x1920, zoom dinâmico, color grade,
# barra de progresso dourada, selo do evento, CTA animado, flash de transição e áudio masterizado.
set -euo pipefail
IN="${1:?uso: edit.sh entrada.mp4 saida.mp4}"; OUT="${2:?}"
F=/usr/share/fonts/opentype/inter/Inter-Bold.otf
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
CARD=31.3          # início do card final
GOLD=0xE8C26A

# whoosh sintético nos cortes (a cada 3.2s) + impacto no card
W=$(mktemp -d)
ffmpeg -v error -y -f lavfi -i "anoisesrc=d=0.5:c=pink:a=0.5" \
  -af "highpass=f=500,lowpass=f=6000,afade=t=in:d=0.25,afade=t=out:st=0.25:d=0.25,volume=0.35" "$W/wh.wav"
ffmpeg -v error -y -f lavfi -i "sine=f=60:d=0.6" -af "afade=t=out:d=0.6,volume=0.9" "$W/hit.wav"
SW=""; n=0; LBL=""; NW=$(seq 3.2 3.2 29 | wc -l); SPL=""; for i in $(seq 0 $((NW-1))); do SPL="$SPL[s$i]"; done
SW="[1:a]asplit=$NW$SPL;"
for t in $(seq 3.2 3.2 29); do
  ms=$(python3 -c "print(int(($t-0.15)*1000))")
  SW="$SW[s$n]adelay=${ms}|${ms}[w$n];"; LBL="$LBL[w$n]"; n=$((n+1))
done
cms=$(python3 -c "print(int(($CARD-0.05)*1000))")
SW="$SW[2:a]adelay=${cms}|${cms}[hit];"; LBL="$LBL[hit]"; n=$((n+1))

ffmpeg -v error -y -i "$IN" -i "$W/wh.wav" -i "$W/hit.wav" -filter_complex "
[0:v]scale=1080:1920:flags=lanczos,unsharp=5:5:0.8:3:3:0.4,
eq=contrast=1.08:saturation=1.18:gamma=0.97,
colorbalance=rs=0.02:bs=-0.03:rm=0.02:bm=-0.02,
setsar=1[b];
[b]scale=w='trunc(1080*(1+0.045*mod(t,3.2)/3.2+0.07*mod(floor(t/3.2),2))/2)*2':h=-2:eval=frame,
crop=1080:1920,vignette=PI/5:eval=init,
eq=brightness='0.35*max(0,1-abs(t-$CARD)/0.22)':eval=frame[g];
color=c=$GOLD:s=1080x12:r=30,format=rgba[bar];
[g][bar]overlay=x='-W+W*t/$D':y=1908:eval=frame:shortest=1[o1];
[o1]drawbox=x=300:y=205:w=480:h=62:color=black@0.45:t=fill:enable='between(t,0.4,$CARD-0.2)',
drawbox=x=300:y=205:w=480:h=62:color=$GOLD@0.9:t=2:enable='between(t,0.4,$CARD-0.2)',
drawtext=fontfile=$F:text='TERÇA DA SERRA DAY':fontsize=30:fontcolor=$GOLD:x=(w-text_w)/2:y=222:alpha='min(1,max(0,(t-0.4)*4))':enable='between(t,0.4,$CARD-0.2)',
drawbox=x=250:y=1560:w=580:h=96:color=$GOLD@0.95:t=fill:enable='between(t,28.3,$CARD)',
drawtext=fontfile=$F:text='GARANTA SUA VAGA ↓':fontsize=38:fontcolor=0x1a2a1f:x=(w-text_w)/2:y=1587:enable='between(t,28.3,$CARD)',
fade=t=in:st=0:d=0.35,format=yuv420p[v];
[0:a]highpass=f=80,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,equalizer=f=3500:t=q:w=1:g=2,loudnorm=I=-14:TP=-1.5:LRA=9[a0];
$SW
[a0]$LBL amix=inputs=$((n+1)):normalize=0:duration=first,alimiter=limit=0.95[a]
" -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 17 -profile:v high -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 192k -movflags +faststart "$OUT"
